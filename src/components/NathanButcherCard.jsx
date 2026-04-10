import SecretBusinessCard from './SecretBusinessCard';

const brandHref = 'https://qortana.com/';

const contactLinks = [
  {
    label: 'Book AI Infrastructure Call',
    href: 'https://cal.com/qortana/ai-infra-meeting',
    className: 'secret-card-action secret-card-action-primary',
  },
  {
    label: 'Website',
    href: brandHref,
    className: 'secret-card-action',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/nathanbutcher123',
    className: 'secret-card-action',
  },
  {
    label: '714 235 3089',
    href: 'tel:+17142353089',
    className: 'secret-card-action',
  },
];

export default function NathanButcherCard() {
  return (
    <SecretBusinessCard
      routeTitle="Nathan Butcher | Qortana"
      firstName="Nathan"
      lastName="Butcher"
      fullName="Nathan Butcher"
      title="AI & Automation Engineer"
      note="Building your autonomous workforce."
      brandHref={brandHref}
      primaryActions={contactLinks}
      saveFileName="nathan-butcher.vcf"
      phoneNumber="+1-714-235-3089"
      socialLinks={[{ href: 'https://www.linkedin.com/in/nathanbutcher123' }]}
    />
  );
}
