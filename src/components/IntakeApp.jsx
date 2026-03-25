import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';
import { QORTANA_INTAKE_STEPS, QUESTION_STEPS } from '../intake/sandlerIntakeConfig';
import {
  BRAND_NAME,
  LEGAL_CONSENT_LABEL_TEXT,
  LEGAL_VERSION,
  SMS_CONSENT_LABEL_TEXT,
  SMS_CONSENT_SCOPE,
} from '../legal/legalConfig';

const INTAKE_API_URL = '/api/intake';
const INTAKE_TIMEOUT_MS = 5000;
const INTAKE_RETRY_DELAY_MS = 400;
const INTAKE_MAX_ATTEMPTS = 2;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DEFAULT_QORTANA_BOOKING_URL = 'https://cal.com/qortana/ai-infra-meeting';
const QORTANA_BOOKING_URL = String(
  import.meta.env.VITE_QORTANA_BOOKING_URL || DEFAULT_QORTANA_BOOKING_URL,
).trim();
const CAL_EMBED_ORIGIN = 'https://app.cal.com';
const CAL_EMBED_NAMESPACE = 'ai-infra-meeting';
const CAL_LINK = 'qortana/ai-infra-meeting';
const CAL_EMBED_SCRIPT_SRC = `${CAL_EMBED_ORIGIN}/embed/embed.js`;

let calEmbedScriptPromise = null;

function ensureCalEmbedScript() {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Cal.com embed can only load in the browser.'));
  }

  if (window.Cal?.loaded) {
    return Promise.resolve(window.Cal);
  }

  if (calEmbedScriptPromise) {
    return calEmbedScriptPromise;
  }

  calEmbedScriptPromise = new Promise((resolve, reject) => {
    if (!window.Cal) {
      window.Cal = function calBootstrap() {
        const cal = window.Cal;
        const args = arguments;

        if (!cal.loaded) {
          cal.ns = {};
          cal.q = cal.q || [];
        }

        if (args[0] === 'init') {
          const namespace = args[1];
          const api = function apiProxy() {
            api.q.push(arguments);
          };
          api.q = api.q || [];

          if (typeof namespace === 'string') {
            cal.ns[namespace] = cal.ns[namespace] || api;
            cal.ns[namespace].q.push(args);
            cal.q.push(['initNamespace', namespace]);
          } else {
            cal.q.push(args);
          }

          return;
        }

        cal.q.push(args);
      };
      window.Cal.ns = {};
      window.Cal.q = [];
    }

    const existingScript = document.querySelector(`script[src="${CAL_EMBED_SCRIPT_SRC}"]`);

    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(window.Cal), { once: true });
      existingScript.addEventListener(
        'error',
        () => reject(new Error('Failed to load Cal.com embed script.')),
        { once: true },
      );
      return;
    }

    const script = document.createElement('script');
    script.src = CAL_EMBED_SCRIPT_SRC;
    script.async = true;
    script.onload = () => resolve(window.Cal);
    script.onerror = () => reject(new Error('Failed to load Cal.com embed script.'));
    document.head.appendChild(script);
  });

  return calEmbedScriptPromise;
}

function buildCalPrefill(formData, submissionId) {
  const config = {
    layout: 'month_view',
    useSlotsViewOnSmallScreen: true,
    'metadata[source]': 'qortana_company_intake',
  };

  const fullName = String(formData?.fullName || '').trim();
  const contactEmail = String(formData?.contactEmail || '').trim();
  const phoneNumber = String(formData?.phoneNumber || '').trim();
  const businessName = String(formData?.businessName || '').trim();

  if (fullName) config.name = fullName;
  if (contactEmail) config.email = contactEmail;
  if (submissionId) config['metadata[submissionId]'] = submissionId;
  if (businessName) config['metadata[businessName]'] = businessName;

  if (phoneNumber) {
    config.location = JSON.stringify({
      value: 'phone',
      optionValue: phoneNumber,
    });
    config.attendeePhoneNumber = phoneNumber;
  }

  return config;
}

function renderRichParts(parts) {
  return parts.map((part, index) => {
    if (part.type === 'link') {
      return (
        <Link
          key={`${part.value}-${index}`}
          to={part.to}
          className="inline-legal-link"
          onClick={(event) => event.stopPropagation()}
        >
          {part.value}
        </Link>
      );
    }

    return <React.Fragment key={`${part.value}-${index}`}>{part.value}</React.Fragment>;
  });
}

function renderConsentField(field, formData, updateFormData) {
  const fieldId = `field-${field.name}`;

  return (
    <div key={field.name} className="compliance-option">
      <div className="consent-field">
        <input
          id={fieldId}
          type="checkbox"
          className="consent-input"
          checked={Boolean(formData[field.name])}
          onChange={(event) => updateFormData(field.name, event.target.checked)}
        />

        <label htmlFor={fieldId} className="consent-box" aria-hidden="true">
          {formData[field.name] ? <Check size={14} strokeWidth={3} /> : null}
        </label>

        <div className="consent-copy">
          <label htmlFor={fieldId} className="consent-text">
            {field.labelParts ? renderRichParts(field.labelParts) : field.label}
          </label>

          {field.helperParts ? (
            <span className="field-helper field-helper-inline">
              {renderRichParts(field.helperParts)}
            </span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function SuccessPage({ formData, submissionId }) {
  const embedRef = useRef(null);
  const [calStatus, setCalStatus] = useState('loading');
  const smsOptedIn = Boolean(formData?.smsOptIn);

  useEffect(() => {
    let isCancelled = false;

    async function mountCal() {
      try {
        const Cal = await ensureCalEmbedScript();
        if (!Cal || !embedRef.current) {
          throw new Error('Cal.com did not initialize.');
        }

        Cal('init', CAL_EMBED_NAMESPACE, { origin: CAL_EMBED_ORIGIN });
        Cal.ns[CAL_EMBED_NAMESPACE]('ui', {
          hideEventTypeDetails: false,
          layout: 'month_view',
        });
        embedRef.current.innerHTML = '';
        Cal.ns[CAL_EMBED_NAMESPACE]('inline', {
          elementOrSelector: embedRef.current,
          calLink: CAL_LINK,
          config: buildCalPrefill(formData, submissionId),
        });

        if (!isCancelled) {
          setCalStatus('ready');
        }
      } catch (error) {
        console.error('Cal embed failed to load:', error);
        if (!isCancelled) {
          setCalStatus('error');
        }
      }
    }

    mountCal();

    return () => {
      isCancelled = true;
      if (embedRef.current) {
        embedRef.current.innerHTML = '';
      }
    };
  }, [formData, submissionId]);

  return (
    <div className="root-wrapper root-wrapper-success">
      <div className="ambient-glow" />
      <motion.div
        className="success-card success-card-booking"
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

        <p className="success-eyebrow">Strategy Intake Submitted</p>
        <h1 className="success-title">Book your strategy call.</h1>
        <p className="success-body">
          Your intake is in and saved. The final step is choosing a time so we can review the
          workflows, systems, and approval boundaries worth discussing first.
        </p>
        <p className="success-contact">
          We&apos;ve carried your contact details into the booking flow so the handoff feels
          seamless.
        </p>
        <p className="success-note">
          {smsOptedIn
            ? `${BRAND_NAME} can use the number you opted in with for booking confirmations, reminders, rescheduling updates, and direct follow-up tied to this inquiry.`
            : 'You did not opt in to call-related text reminders in this intake, so this handoff stays limited to the booking flow and related email coordination unless you request SMS later.'}
        </p>

        <div className="success-booking-shell">
          {calStatus === 'loading' && (
            <div className="success-booking-loading">
              Loading the booking calendar and carrying your details forward...
            </div>
          )}

          <div
            ref={embedRef}
            className={`success-booking-embed${calStatus === 'ready' ? ' success-booking-embed-ready' : ''}`}
          />

          {calStatus === 'error' && (
            <div className="success-pending-action">
              The embedded calendar didn&apos;t load here, but your intake was submitted
              successfully. Use the button below to book directly.
            </div>
          )}
        </div>

        <div className="success-actions">
          {QORTANA_BOOKING_URL && calStatus !== 'ready' ? (
            <a
              href={QORTANA_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="success-primary-action"
            >
              Open booking page
              <ArrowUpRight size={16} />
            </a>
          ) : null}

          <Link to="/" className="success-secondary-action">
            Back to homepage
          </Link>
        </div>

        <div className="success-divider" />
        <p className="success-fine">
          Qortana Strategy Intake • Workflow, systems, governance, and infrastructure review
        </p>
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
    return missingField.errorMessage || `${missingField.label} is required.`;
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

function buildConsentAudit(submittedAt, formData) {
  const pagePath = typeof window !== 'undefined' ? window.location.pathname : '';
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const userAgent = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  const legalAccepted = Boolean(formData.legalAccepted);
  const smsOptIn = Boolean(formData.smsOptIn);

  return {
    legalAccepted,
    legalAcceptedAt: legalAccepted ? submittedAt : '',
    legalVersion: LEGAL_VERSION,
    legalLabel: LEGAL_CONSENT_LABEL_TEXT,
    smsOptIn,
    smsOptInAt: smsOptIn ? submittedAt : '',
    smsConsentScope: SMS_CONSENT_SCOPE,
    smsConsentLabel: SMS_CONSENT_LABEL_TEXT,
    capture: {
      pagePath,
      pageUrl,
      userAgent,
    },
  };
}

function buildSubmissionPayload(submissionId, formData) {
  const submittedAt = new Date().toISOString();
  const consentAudit = buildConsentAudit(submittedAt, formData);
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
    source: 'qortana_company_intake',
    preferredContact: consentAudit.smsOptIn ? 'Email + SMS' : 'Email',
    consent: consentAudit,
    customer: {
      fullName: formData.fullName || '',
      businessName: formData.businessName || '',
      contactEmail: formData.contactEmail || '',
      phoneNumber: formData.phoneNumber || '',
      businessAddress: '',
      serviceArea: formData.operatingRegion || '',
    },
    rawIntake: {
      intakeType: 'qortana_company_intake',
      intakeLabel: 'Qortana Strategy Intake',
      questionCount: QUESTION_STEPS.length,
      submittedAt,
      fullName: formData.fullName || '',
      roleTitle: formData.roleTitle || '',
      businessName: formData.businessName || '',
      contactEmail: formData.contactEmail || '',
      phoneNumber: formData.phoneNumber || '',
      operatingRegion: formData.operatingRegion || '',
      companyModel: formData.companyModel || '',
      revenueBand: formData.revenueBand || '',
      aiMaturity: formData.aiMaturity || '',
      deploymentTimeline: formData.deploymentTimeline || '',
      legalAccepted: consentAudit.legalAccepted,
      smsOptIn: consentAudit.smsOptIn,
      consentAudit,
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
    const handler = (event) => {
      if (event.key !== 'Enter' || event.target.tagName === 'TEXTAREA' || loadingRef.current) return;
      handleNextRef.current?.();
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const currentStep = QORTANA_INTAKE_STEPS[currentStepIdx];
  const currentFormFields = currentStep.fields.filter((field) => field.type !== 'consent');
  const currentConsentFields = currentStep.fields.filter((field) => field.type === 'consent');
  const progress = ((currentStepIdx + 1) / QORTANA_INTAKE_STEPS.length) * 100;
  const isLastStep = currentStepIdx === QORTANA_INTAKE_STEPS.length - 1;

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
    return <SuccessPage formData={formData} submissionId={submissionId} />;
  }

  return (
    <div className="root-wrapper root-wrapper-intake">
      <div className="ambient-glow" />

      <div className="form-card">
        <span className="corner corner-tl" />
        <span className="corner corner-tr" />
        <span className="corner corner-bl" />
        <span className="corner corner-br" />

        <div className="card-header">
          <span className="brand-label">Qortana Strategy Intake</span>
          <span className="step-counter">
            <span className="step-current">{String(currentStepIdx + 1).padStart(2, '0')}</span>
            <span className="step-sep"> / </span>
            <span className="step-total">{String(QORTANA_INTAKE_STEPS.length).padStart(2, '0')}</span>
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
                {currentFormFields.map((field) => {
                  const fieldId = `field-${field.name}`;

                  return (
                    <div key={field.name} className="field-group">
                      <label className="field-label" htmlFor={fieldId}>
                        {field.label}
                        {field.required && <span className="required-mark"> *</span>}
                      </label>

                      {field.type === 'textarea' ? (
                        <textarea
                          id={fieldId}
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
                        <>
                          <input
                            id={fieldId}
                            type={field.type}
                            className="field-input"
                            placeholder={field.placeholder}
                            value={formData[field.name] || ''}
                            onChange={(event) => updateFormData(field.name, event.target.value)}
                            onKeyDown={(event) => event.key === 'Enter' && handleNext()}
                          />

                          {field.helperText ? <p className="field-helper">{field.helperText}</p> : null}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {!isLastStep ? (
              <>
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
                    {loading ? 'Submitting...' : 'Continue →'}
                  </button>
                </div>
                {stepError && <div className="checkout-error">{stepError}</div>}
                {submitError && <div className="checkout-error">{submitError}</div>}
              </>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>

      {isLastStep ? (
        <motion.section
          className="compliance-panel"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="compliance-panel-copy">
            <span className="compliance-kicker">Consent & Booking</span>
            <h2>Confirm the handoff before you schedule.</h2>
            <p>
              The legal acknowledgements and reminder choice sit outside the intake card so the
              last decision stays visible, readable, and easy to act on without turning the form
              into a scroll box.
            </p>
          </div>

          <div className="compliance-options">
            {currentConsentFields.map((field) => renderConsentField(field, formData, updateFormData))}
          </div>

          <div className="nav-row nav-row-standalone">
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
              {loading ? 'Submitting...' : 'Continue to Schedule'}
            </button>
          </div>

          <p className="nav-fineprint">
            By clicking “Continue to Schedule,” you submit your inquiry and, if selected above,
            agree to the communication option(s) you chose.
          </p>

          {stepError && <div className="checkout-error">{stepError}</div>}
          {submitError && <div className="checkout-error">{submitError}</div>}
        </motion.section>
      ) : null}

      <div className="enter-hint">
        Press <span className="enter-key">Enter</span> to continue
      </div>
    </div>
  );
}
