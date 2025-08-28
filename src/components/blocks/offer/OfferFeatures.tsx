
type OfferFeaturesProps = {
  type: string;
}
export default function OfferFeatures({type}: OfferFeaturesProps) {
  return (
    <ul className='offer__features'>
      <li className='offer__feature offer__feature--entire'>{type}</li>
      <li className='offer__feature offer__feature--bedrooms'>3 Bedrooms</li>
      <li className='offer__feature offer__feature--adults'>Max 4 adults</li>
    </ul>
  );
}

