import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './СarouselComponent.css';

const photos = [
  { id: 1, photo: 'temp/furniture/1.png' },
  { id: 2, photo: 'temp/furniture/2.png' },
  { id: 3, photo: 'temp/furniture/3.png' },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  // autoplay: true
};

const CarouselComponent = () => {
  return (
    <div className="sliderContainer">
      <Slider {...settings}>
        {photos.map((item) => (
          <div className="slide" key={item.id}>
            <img src={`/${item.photo}`} alt={`img-${item.id}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselComponent;
