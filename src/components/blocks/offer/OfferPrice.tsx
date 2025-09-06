
const EURO_SYMBOL = '€';

export default function OfferPrice({ price }: { price: number }) {

  if (!price) {
    return null;
  }
  return (
    <div className='offer__price'>
      <b className='offer__price-value'>
        {EURO_SYMBOL}
        {price}
      </b>
      <span className='offer__price-text'>&nbsp;night</span>
    </div>
  );
}
