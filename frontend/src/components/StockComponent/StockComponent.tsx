import styles from './StockComponent.module.css';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { useEffect } from 'react';
import { furnitureActions } from '../../redux/slices/furnitureSlice';
import { imageUrl } from '../../constants/url';

const StockComponent = () => {
  
  const dispatch = useAppDispatch();
  
  const { furnitureResult } = useAppSelector(state => state.furnitureSliceState);
  
  
  useEffect(() => {
    dispatch(furnitureActions.loadFurnitureList());
  }, [dispatch]);
  return (
    <div>
      <div className={styles.featuredContainer}>
        <h2 className={styles.featuredTitle}>Акції</h2>
        <a href="#" className={styles.viewAll}>Переглянути всі →</a>
      </div>
      <div className={styles.productContainer}>
        {furnitureResult
          .filter(furniture => furniture.discount > 0)
          .slice(0, 4)
          .map(furniture => (
            <div key={furniture.id} className={styles.productCard}>
              <div className={styles.productImageContainer}>
                <img
                  className={styles.productImage}
                  src={imageUrl + furniture.photos[0]}
                  alt={furniture.name}
                />
                <div className={styles.wishlistIcon}>♥</div>
              </div>
              <div className={styles.productDetails}>
                <h3 className={styles.productName}>{furniture.name}</h3>
                <div>
              <span className={styles.productPrice}>{
                furniture.price - furniture.price * (furniture.discount / 100)
              }</span>
                  <span
                    className={styles.originalPrice}>{furniture.price}</span>
                </div>
                <button className={styles.addToCartButton}>Додати в кошик
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default StockComponent;
