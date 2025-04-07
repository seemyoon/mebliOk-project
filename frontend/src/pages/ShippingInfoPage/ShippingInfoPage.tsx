import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { useEffect } from 'react';
import { shippingInfoActions } from '../../redux/slices/shippingInfoSlice';
import styles from './ShippingInfoPage.module.css';

const path = 'temp/shipping-info/1.jpg'

const ShippingInfoPage = () => {
  
  const dispatch = useAppDispatch();
  const { shippingInfo } = useAppSelector(state => state.shippingInfoState);
  
  useEffect(() => {
    dispatch(shippingInfoActions.loadShippingInfo())
  }, [dispatch])
  return (
    <div className={styles.shippingContainer}>
      <h2 className={styles.shippingTitle}>{shippingInfo?.title }</h2>
      <p className={styles.shippingBody}>{shippingInfo?.body}</p>
      <img src={path} alt='photo-dilevery' />
      <p className={styles.shippingDescription}>{shippingInfo?.description}</p>
    </div>
  );
};

export default ShippingInfoPage;