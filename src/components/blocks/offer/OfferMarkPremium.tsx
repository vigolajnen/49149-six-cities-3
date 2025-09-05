type OfferMarkPremiumProps = {
  isPremium?: boolean;
};
export default function OfferMarkPremium({ isPremium = false }: OfferMarkPremiumProps) {
  if (!isPremium) {
    return null;
  }

  return (
    <div className='offer__mark'>
      <span>Premium</span>
    </div>
  );
}
