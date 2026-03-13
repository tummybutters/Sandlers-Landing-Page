export function splitLines(value) {
  return String(value || '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
}

export function getInitials(name) {
  return String(name || '')
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
}

export function toRgbTuple(hex, fallback = '0, 0, 0') {
  const normalized = String(hex || '').replace('#', '').trim()
  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) return fallback

  const channel = (offset) => Number.parseInt(normalized.slice(offset, offset + 2), 16)
  return `${channel(0)}, ${channel(2)}, ${channel(4)}`
}

export function mergeTemplateData(defaultData, data) {
  return {
    ...defaultData,
    ...data,
    colors: {
      ...defaultData.colors,
      ...(data?.colors || {}),
    },
    services: data?.services?.length ? data.services : defaultData.services,
    stats: data?.stats?.length ? data.stats : defaultData.stats,
  }
}

export function phoneHref(phone) {
  const digits = String(phone || '').replace(/[^\d+]/g, '')
  if (!digits) return '#contact'
  if (digits.startsWith('+')) return `tel:${digits}`
  if (digits.length === 10) return `tel:+1${digits}`
  return `tel:${digits}`
}
