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
  {
    label: '949 395 1074',
    href: 'tel:+19493951074',
    className: 'secret-card-action',
  },
];

export default function ThomasButcherCard() {
  return (
    <SecretBusinessCard
      routeTitle="Thomas Butcher | Qortana"
      fullName="Thomas Butcher"
      title="Founding Engineer"
      note="Building your autonomous workforce."
      brandHref={brandHref}
      primaryActions={primaryActions}
      contactDownloadPath="/contacts/thomas-butcher.vcf"
    />
  );
}
