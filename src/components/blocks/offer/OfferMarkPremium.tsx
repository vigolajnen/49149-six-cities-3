export default function OfferMarkPremium({ isPremium = false }: { isPremium?: boolean }) {
  if (!isPremium) {
    return null;
  }

  return (
    <div className='offer__mark'>
      <span>Premium</span>
    </div>
  );
}
