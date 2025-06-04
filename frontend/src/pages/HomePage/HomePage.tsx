import CarouselComponent
  from '../../components/CarouselComponent/СarouselComponent';
import styles from './HomePage.module.css';
import CategoriesComponent
  from '../../components/CategoriesComponent/CategoriesComponent';
import AboutUsComponent
  from '../../components/AboutUsComponent/AboutUsComponent';
import StockComponent from '../../components/StockComponent/StockComponent';
import GetInTouchComponent
  from '../../components/GetInTouchComponent/GetInTouchComponent';

export const HomePage = () => {
  
  return (
    <div>
      <div className={styles.pageContainer}>
        <div className={styles.carouselContainer}>
          <CarouselComponent />
        </div>
        <h1 className={styles.healing}>Категорії</h1>
        <CategoriesComponent />
        <button className={styles.roundedButton}>Переглянути повний каталог
        </button>
      </div>
      <AboutUsComponent />
      <StockComponent />
      <GetInTouchComponent />
    </div>
  
  );
};

