import { mergeTemplateData, phoneHref, splitLines } from '../templateHelpers.js'

export function buildImportedSiteData(defaultData, data, options = {}) {
  const site = mergeTemplateData(defaultData, data)
  const services = Array.isArray(site.services) && site.services.length ? site.services : defaultData.services
  const stats = Array.isArray(site.stats) && site.stats.length ? site.stats : defaultData.stats
  const statCount = options.statCount || stats.length

  return {
    site,
    heroLines: splitLines(site.heroTitle),
    aboutLines: splitLines(site.aboutH2),
    services,
    stats: stats.slice(0, statCount).map(([value, label]) => ({ value, label })),
    emailHref: `mailto:${site.email}`,
    phoneLink: phoneHref(site.phone),
  }
}
