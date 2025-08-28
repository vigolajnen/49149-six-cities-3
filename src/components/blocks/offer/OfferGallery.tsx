export default function OfferGallery() {
  return (
    <div className='offer__gallery-container container'>
      <div className='offer__gallery'>
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/room.jpg' alt='Photo studio' loading='lazy' />
        </div>
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/apartment-01.jpg' alt='Photo studio' loading='lazy' />
        </div>
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/apartment-02.jpg' alt='Photo studio' loading='lazy' />
        </div>
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/apartment-03.jpg' alt='Photo studio' loading='lazy' />
        </div>
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/studio-01.jpg' alt='Photo studio' loading='lazy' />
        </div>
        <div className='offer__image-wrapper'>
          <img className='offer__image' src='img/apartment-01.jpg' alt='Photo studio' loading='lazy' />
        </div>
      </div>
    </div>
  );
}
