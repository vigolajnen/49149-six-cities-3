type OfferInsideProps = {
  amenities?: string[];
};

const DEFAULT_AMENITIES = ['Wi-Fi', 'Washing machine', 'Towels', 'Heating', 'Coffee machine', 'Baby seat', 'Kitchen', 'Dishwasher', 'Cabel TV', 'Fridge'];

export default function OfferInside({ amenities = DEFAULT_AMENITIES }: OfferInsideProps) {
  return (
    <div className='offer__inside'>
      <h2 className='offer__inside-title'>What&apos;s inside</h2>
      <ul className='offer__inside-list'>
        {amenities.map((amenity) => (
          <li key={amenity} className='offer__inside-item'>
            {amenity}
          </li>
        ))}
      </ul>
    </div>
  );
}
