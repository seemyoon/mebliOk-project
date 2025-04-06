import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const BASE_URL = "http://localhost:8001/bucket-mebliok/";

const photos = [
  {
    id: "1",
    photo: "image/5adc4e5a-87bc-4214-a930-a6b15b60773a/ce23b486-1f99-4259-976a-5f16563f6fc2.png"
  },
  {
    id: "2",
    photo: "image/d4b1d6c9-d798-41d4-beff-9ffc23c678bc/8dbc4d74-dc65-4d67-84ba-0626ebb2a235.png"
  }
];

const CarouselComponent  = () => {
  return (
    <Slider {...settings}>
      {photos.map((item) => (
        <div key={item.id}>
          <img src={`${BASE_URL}${item.photo}`} alt="img" />
        </div>
      ))}
    </Slider>
  );
};

export default CarouselComponent;