import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import GlobalFooter from './components/GlobalFooter';
import { sampleSites } from './templateStudio/sampleSites';
import { templateRegistry } from './templateStudio/templateRegistry';

const IntakeApp = lazy(() => import('./components/IntakeApp'));
const LandingPage = lazy(() => import('./components/LandingPage'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const InfrastructurePage = lazy(() => import('./components/InfrastructurePage'));
const InfrastructureDetailPage = lazy(() => import('./components/InfrastructureDetailPage'));
const LegalPage = lazy(() => import('./components/LegalPage'));
const NathanButcherCard = lazy(() => import('./components/NathanButcherCard'));
const SalesAssistantIntakeApp = lazy(() => import('./components/SalesAssistantIntakeApp'));
const SalesAssistantLandingPage = lazy(() => import('./components/SalesAssistantLandingPage'));

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

function AppRoutes() {
  const location = useLocation();
  const hideFooter =
    location.pathname.startsWith('/sales-assistant-intake') || location.pathname === '/nathanbutcher';

  return (
    <>
      <Suspense fallback={<div className="app-loading-state" />}>
        <Routes>
          {templateRegistry.map((template) => (
            <Route
              key={template.id}
              path={`/preview/${template.id}`}
              element={<TemplatePreview templateId={template.id} />}
            />
          ))}
          <Route path="/sales-assistant-intake" element={<SalesAssistantLandingPage />} />
          <Route path="/sales-assistant-intake/quiz" element={<SalesAssistantIntakeApp />} />
          <Route path="/intake" element={<IntakeApp />} />
          <Route path="/nathanbutcher" element={<NathanButcherCard />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/infrastructure" element={<InfrastructurePage />} />
          <Route
            path="/infrastructure/autonomous-workers"
            element={<InfrastructureDetailPage pageKey="autonomous-workers" />}
          />
          <Route
            path="/infrastructure/claude-workspaces"
            element={<InfrastructureDetailPage pageKey="claude-workspaces" />}
          />
          <Route
            path="/infrastructure/deployment-models"
            element={<InfrastructureDetailPage pageKey="deployment-models" />}
          />
          <Route path="/privacy" element={<LegalPage pageKey="privacy" />} />
          <Route path="/terms" element={<LegalPage pageKey="terms" />} />
          <Route path="/messaging-terms" element={<LegalPage pageKey="messagingTerms" />} />
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </Suspense>

      {hideFooter ? null : <GlobalFooter />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
