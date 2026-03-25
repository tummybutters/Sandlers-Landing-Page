import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { sampleSites } from './templateStudio/sampleSites';
import { templateRegistry } from './templateStudio/templateRegistry';

const IntakeApp = lazy(() => import('./components/IntakeApp'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const LegalPage = lazy(() => import('./components/LegalPage'));

function getTemplatePreviewData(templateId) {
  return sampleSites.find((entry) => entry.data.templateId === templateId)?.data || { templateId };
}

function TemplatePreview({ templateId }) {
  const template = templateRegistry.find((entry) => entry.id === templateId);

  if (!template) {
    return <LandingPage />;
  }

  const Preview = template.component;
  return <Preview data={getTemplatePreviewData(templateId)} />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="app-loading-state" />}>
        <Routes>
          {templateRegistry.map((template) => (
            <Route
              key={template.id}
              path={`/preview/${template.id}`}
              element={<TemplatePreview templateId={template.id} />}
            />
          ))}
          <Route path="/intake" element={<IntakeApp />} />
          <Route path="/privacy" element={<LegalPage pageKey="privacy" />} />
          <Route path="/terms" element={<LegalPage pageKey="terms" />} />
          <Route path="/messaging-terms" element={<LegalPage pageKey="messagingTerms" />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
