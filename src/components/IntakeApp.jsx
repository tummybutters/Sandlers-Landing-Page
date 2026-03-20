import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { QUESTION_STEPS, SANDLER_INTAKE_STEPS } from '../intake/sandlerIntakeConfig';

const INTAKE_API_URL = '/api/intake';
const INTAKE_TIMEOUT_MS = 5000;
const INTAKE_RETRY_DELAY_MS = 400;
const INTAKE_MAX_ATTEMPTS = 2;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function SuccessPage() {
  return (
    <div className="root-wrapper">
      <div className="ambient-glow" />
      <motion.div
        className="success-card"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-bl" />
        <span className="corner corner-br" />

        <div className="success-check">
          <Check size={22} strokeWidth={2.5} />
        </div>

        <p className="success-eyebrow">Intake Submitted</p>
        <h1 className="success-title">You&apos;re in.</h1>
        <p className="success-body">
          Your Sandler Agent Intake is in the queue. We&apos;ll use it to understand your workflow,
          systems, and friction points before we follow up.
        </p>
        <p className="success-contact">
          If anything is missing, we&apos;ll reach out using the contact details you just sent.
        </p>

        <div className="success-divider" />
        <p className="success-fine">Sandler Agent Intake • Workflow, systems, and trust-boundary review</p>
      </motion.div>
    </div>
  );
}

function createSubmissionId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return `sub_${crypto.randomUUID()}`;
  }

  return `sub_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function hasValue(value) {
  if (Array.isArray(value)) {
    return value.length > 0;
  }

  if (typeof value === 'string') {
    return value.trim().length > 0;
  }

  return Boolean(value);
}

function getDigits(value) {
  return String(value || '').replace(/\D/g, '');
}

function getStepErrorMessage(step, formData) {
  const missingField = step.fields.find((field) => field.required && !hasValue(formData[field.name]));
  if (missingField) {
    return `${missingField.label} is required.`;
  }

  if (step.id === 'contact_info') {
    const email = String(formData.contactEmail || '').trim();
    const phoneDigits = getDigits(formData.phoneNumber);

    if (email && !EMAIL_PATTERN.test(email)) {
      return 'Enter a valid email address.';
    }

    if (phoneDigits && phoneDigits.length < 10) {
      return 'Enter a valid phone number.';
    }
  }

  return '';
}

async function extractApiError(response) {
  const contentType = response.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    const data = await response.json().catch(() => null);
    if (data?.error) {
      return data.error;
    }
  } else {
    const text = await response.text().catch(() => '');
    if (text) {
      return text;
    }
  }

  return `Server responded with ${response.status}`;
}

function formatAnswerValue(value) {
  if (Array.isArray(value)) {
    return [...value];
  }

  return value || '';
}

function buildSubmissionPayload(submissionId, formData) {
  const submittedAt = new Date().toISOString();
  const answersOrdered = QUESTION_STEPS.map((step, index) => {
    const field = step.fields[0];

    return {
      questionNumber: index + 1,
      key: field.name,
      category: step.kicker,
      question: step.title,
      answer: formatAnswerValue(formData[field.name]),
    };
  });

  const answers = Object.fromEntries(
    answersOrdered.map((entry) => [entry.key, entry.answer]),
  );

  return {
    submissionId,
    createdAt: submittedAt,
    updatedAt: submittedAt,
    source: 'sandler_agent_intake',
    preferredContact: 'Email',
    customer: {
      fullName: formData.fullName || '',
      businessName: formData.businessName || '',
      contactEmail: formData.contactEmail || '',
      phoneNumber: formData.phoneNumber || '',
      businessAddress: '',
      serviceArea: formData.mainTerritory || '',
    },
    rawIntake: {
      intakeType: 'sandler_agent_intake',
      intakeLabel: 'Sandler Agent Intake',
      questionCount: QUESTION_STEPS.length,
      submittedAt,
      fullName: formData.fullName || '',
      businessName: formData.businessName || '',
      contactEmail: formData.contactEmail || '',
      phoneNumber: formData.phoneNumber || '',
      territory: formData.mainTerritory || '',
      roleType: formData.roleType || '',
      answers,
      answersOrdered,
    },
  };
}

export default function IntakeApp() {
  const [isSubmitted, setIsSubmitted] = useState(
    () => new URLSearchParams(window.location.search).get('success') === 'true',
  );
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [formData, setFormData] = useState({});
  const [direction, setDirection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [stepError, setStepError] = useState('');
  const [submissionId] = useState(() => createSubmissionId());

  const handleNextRef = useRef(null);
  const loadingRef = useRef(false);
  loadingRef.current = loading;

  useEffect(() => {
    document.body.classList.add('body-intake-lock');
    return () => {
      document.body.classList.remove('body-intake-lock');
    };
  }, []);

  useEffect(() => {
    const handler = (event) => {
      if (event.key !== 'Enter' || event.target.tagName === 'TEXTAREA' || loadingRef.current) return;
      handleNextRef.current?.();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const currentStep = SANDLER_INTAKE_STEPS[currentStepIdx];
  const progress = ((currentStepIdx + 1) / SANDLER_INTAKE_STEPS.length) * 100;
  const isLastStep = currentStepIdx === SANDLER_INTAKE_STEPS.length - 1;

  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const submitIntake = async () => {
    const payload = buildSubmissionPayload(submissionId, formData);

    for (let attempt = 1; attempt <= INTAKE_MAX_ATTEMPTS; attempt += 1) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), INTAKE_TIMEOUT_MS);

      try {
        const response = await fetch(INTAKE_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          signal: controller.signal,
        });

        if (!response.ok) {
          const apiError = await extractApiError(response);
          throw new Error(apiError);
        }

        const result = await response.json();
        clearTimeout(timeoutId);
        return result;
      } catch (error) {
        clearTimeout(timeoutId);
        if (attempt === INTAKE_MAX_ATTEMPTS) {
          throw error;
        }
        await wait(INTAKE_RETRY_DELAY_MS);
      }
    }

    return null;
  };

  const handleNext = async () => {
    const validationError = getStepErrorMessage(currentStep, formData);
    if (validationError) {
      setStepError(validationError);
      return;
    }

    if (!isLastStep) {
      setStepError('');
      setSubmitError('');
      setDirection(1);
      setCurrentStepIdx((prev) => prev + 1);
      return;
    }

    setStepError('');
    setSubmitError('');
    setLoading(true);

    try {
      const result = await submitIntake();
      if (!result?.ok) {
        throw new Error('Submission did not complete successfully');
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error('Intake submit failed:', error);
      setSubmitError(
        error instanceof Error && error.message
          ? error.message
          : 'Could not submit your details right now. Please check your connection and try again.',
      );
      setLoading(false);
    }
  };

  const handlePrev = () => {
    if (currentStepIdx > 0) {
      setStepError('');
      setSubmitError('');
      setDirection(-1);
      setCurrentStepIdx((prev) => prev - 1);
    }
  };

  const updateFormData = useCallback((name, value) => {
    setStepError('');
    setSubmitError('');
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const toggleChoiceValue = useCallback((name, option, allowMultiple) => {
    setStepError('');
    setSubmitError('');
    setFormData((prev) => {
      if (!allowMultiple) {
        return { ...prev, [name]: option };
      }

      const selected = Array.isArray(prev[name]) ? prev[name] : [];
      const nextValues = selected.includes(option)
        ? selected.filter((value) => value !== option)
        : [...selected, option];

      return { ...prev, [name]: nextValues };
    });
  }, []);

  handleNextRef.current = handleNext;

  if (isSubmitted) {
    return <SuccessPage />;
  }

  return (
    <div className="root-wrapper">
      <div className="ambient-glow" />

      <div className="form-card">
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-bl" />
        <span className="corner corner-br" />

        <div className="card-header">
          <span className="brand-label">Sandler Agent Intake</span>
          <span className="step-counter">
            <span className="step-current">{String(currentStepIdx + 1).padStart(2, '0')}</span>
            <span className="step-sep"> / </span>
            <span className="step-total">{String(SANDLER_INTAKE_STEPS.length).padStart(2, '0')}</span>
          </span>
        </div>

        <div className="progress-track">
          <motion.div
            className="progress-fill"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep.id}
            custom={direction}
            initial={{ opacity: 0, y: direction > 0 ? 18 : -18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: direction > 0 ? -18 : 18 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="intake-step-content"
          >
            <div className="step-body">
              <div>
                <p className="step-label-tag">{currentStep.kicker}</p>
                <h1 className="step-title">{currentStep.title}</h1>
                <p className="step-description">{currentStep.description}</p>
              </div>

              <div className="fields-container">
                {currentStep.fields.map((field) => (
                  <div key={field.name} className="field-group">
                    <label className="field-label">
                      {field.label}
                      {field.required && <span className="required-mark"> *</span>}
                    </label>

                    {field.type === 'textarea' ? (
                      <textarea
                        className="field-textarea"
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(event) => updateFormData(field.name, event.target.value)}
                      />
                    ) : field.type === 'radio' || field.type === 'checkbox' ? (
                      <div className="radio-group">
                        {field.options.map((option) => {
                          const isSelected = field.type === 'checkbox'
                            ? (Array.isArray(formData[field.name]) ? formData[field.name] : []).includes(option)
                            : formData[field.name] === option;

                          return (
                            <button
                              type="button"
                              key={option}
                              onClick={() => toggleChoiceValue(field.name, option, field.type === 'checkbox')}
                              className={`radio-option${isSelected ? ' radio-selected' : ''}`}
                              aria-pressed={isSelected}
                            >
                              {option}
                            </button>
                          );
                        })}
                      </div>
                    ) : (
                      <input
                        type={field.type}
                        className="field-input"
                        placeholder={field.placeholder}
                        value={formData[field.name] || ''}
                        onChange={(event) => updateFormData(field.name, event.target.value)}
                        onKeyDown={(event) => event.key === 'Enter' && handleNext()}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="nav-row">
              <button
                onClick={handlePrev}
                disabled={loading}
                className={`nav-back${currentStepIdx === 0 ? ' nav-hidden' : ''}`}
              >
                ← Back
              </button>
              <button
                onClick={handleNext}
                disabled={loading}
                className={`nav-next${loading ? ' nav-loading' : ''}`}
              >
                {loading ? 'Submitting...' : isLastStep ? 'Submit Intake →' : 'Continue →'}
              </button>
            </div>
            {stepError && <div className="checkout-error">{stepError}</div>}
            {submitError && <div className="checkout-error">{submitError}</div>}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="enter-hint">
        Press <span className="enter-key">Enter</span> to continue
      </div>
    </div>
  );
}
