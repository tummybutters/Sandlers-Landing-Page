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
  { id: '1', tone: 'Horizon' },
  { id: '2', tone: 'Lumina' },
  { id: '3', tone: 'Bold editorial' },
  { id: '4', tone: 'Classic elegant' },
  { id: '5', tone: 'Nexus' },
  { id: '6', tone: 'Aura' },
  { id: '7', tone: 'Veritas' },
  { id: '8', tone: 'Onyx' },
  { id: '9', tone: 'Equinox' },
  { id: '10', tone: 'Vanguard' },
]

export const templateRegistry = templateMeta.map((template) => ({
  ...template,
  label: `Template ${template.id}`,
  component: templateModules[template.id],
}))
