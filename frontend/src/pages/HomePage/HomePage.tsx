import CarouselComponent
  from '../../components/CarouselComponent/СarouselComponent';
import styles from './HomePage.module.css';
import CategoriesComponent
  from '../../components/CategoriesComponent/CategoriesComponent';

export const HomePage = () => {
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.carouselContainer}>
        <CarouselComponent />
      </div>
      <h1>Категорії</h1>
      <CategoriesComponent />
    </div>
  );
};

