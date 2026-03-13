import { Suspense, lazy } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { sampleSites } from './templateStudio/sampleSites';
import { templateRegistry } from './templateStudio/templateRegistry';

const IntakeApp = lazy(() => import('./components/IntakeApp'));

function getTemplatePreviewData(templateId) {
  return sampleSites.find((entry) => entry.data.templateId === templateId)?.data || { templateId };
}

function TemplatePreview({ templateId }) {
  const template = templateRegistry.find((entry) => entry.id === templateId);

  if (!template) {
    return <IntakeApp />;
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
          <Route path="/" element={<IntakeApp />} />
          <Route path="*" element={<IntakeApp />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
