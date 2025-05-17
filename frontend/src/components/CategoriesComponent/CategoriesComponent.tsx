import { useEffect } from 'react';
import { imageUrl } from '../../constants/url';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { categoriesActions } from '../../redux/slices/CategoriesSlice';
import styles from './CategoriesComponent.module.css';


const CategoriesComponent = () => {
  const dispatch = useAppDispatch();
  const { categoriesResult } = useAppSelector(state => state.categoryInfoState);
  
  useEffect(() => {
    dispatch(categoriesActions.loadCategoryList());
  }, [dispatch]);
  
  return (
    <div className={styles.categoriesGrid}>
      {categoriesResult.map(category => (
        <div key={category.id} className={styles.categoryCard}>
          <div className={styles.overlay}></div>
          <img
            src={imageUrl + category.photo}
            alt={category.title}
            className={styles.categoryImage}
          />
          <div className={styles.categoryTitle}>{category.title}</div>
        </div>
      ))}
    </div>

  );
};

export default CategoriesComponent;