import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { furnitureActions } from '../../redux/slices/furnitureSlice';
import CarouselComponent
  from '../../components/CarouselComponent/СarouselComponent';
import styles from './FurniturePage.module.css';

const FurniturePage = () => {
  const dispatch = useAppDispatch();
  const { furnitureResult } = useAppSelector(state => state.furnitureSliceState);
  
  useEffect(() => {
    dispatch(furnitureActions.loadFurnitureList());
  }, [dispatch, furnitureResult]);
  
  return (
    <div className={styles.pageContainer}>
      <div className={styles.carouselContainer}>
        <CarouselComponent />
      </div>
      
      <div className={styles.containerItems}>
        {furnitureResult?.map((item) => (
          <div key={item.id} className={styles.furnitureItem}>
            <h2>{item.name}</h2>
            <h3>{item.body}</h3>
            <p>{item.description}</p>
            <button className={styles.buyButton}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurniturePage;
