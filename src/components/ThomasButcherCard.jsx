import SecretBusinessCard from './SecretBusinessCard';

const brandHref = 'https://qortana.com/';

const primaryActions = [
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
    label: 'Email',
    href: 'mailto:thomasbutcher@qortana.com',
    className: 'secret-card-action',
  },
];

export default function ThomasButcherCard() {
  return (
    <SecretBusinessCard
      routeTitle="Thomas Butcher | Qortana"
      firstName="Thomas"
      lastName="Butcher"
      fullName="Thomas Butcher"
      title="Founding Engineer"
      note="Building your autonomous workforce."
      brandHref={brandHref}
      primaryActions={primaryActions}
      saveFileName="thomas-butcher.vcf"
      email="thomasbutcher@qortana.com"
      socialLinks={[]}
    />
  );
}
