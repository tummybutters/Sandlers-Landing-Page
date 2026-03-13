import { lazy } from 'react'

const templateModules = {
  '1': lazy(() => import('../templates/Template1.jsx')),
  '2': lazy(() => import('../templates/Template2.jsx')),
  '3': lazy(() => import('../templates/Template3.jsx')),
  '4': lazy(() => import('../templates/Template4.jsx')),
  '5': lazy(() => import('../templates/Template5.jsx')),
  '6': lazy(() => import('../templates/Template6.jsx')),
  '7': lazy(() => import('../templates/Template7.jsx')),
  '8': lazy(() => import('../templates/Template8.jsx')),
  '9': lazy(() => import('../templates/Template9.jsx')),
  '10': lazy(() => import('../templates/Template10.jsx')),
}

const templateMeta = [
  { id: '1', tone: 'Classic dark' },
  { id: '2', tone: 'Clean editorial' },
  { id: '3', tone: 'Bold modern' },
  { id: '4', tone: 'Light professional' },
  { id: '5', tone: 'Structured corporate' },
  { id: '6', tone: 'Minimal premium' },
  { id: '7', tone: 'Traditional luxury' },
  { id: '8', tone: 'High-contrast modern' },
  { id: '9', tone: 'Soft contemporary' },
  { id: '10', tone: 'Sharp executive' },
]

export const templateRegistry = templateMeta.map((template) => ({
  ...template,
  label: `Template ${template.id}`,
  component: templateModules[template.id],
}))
