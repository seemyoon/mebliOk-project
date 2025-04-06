import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { furnitureActions } from '../../redux/slices/furnitureSlice';
import CarouselComponent
  from '../../components/CarouselComponent/СarouselComponent';

const FurniturePage = () => {
  
  const dispatch = useAppDispatch();
  const { furnitureResult } = useAppSelector(state => state.furnitureSliceState);
  
  useEffect(() => {
    dispatch(furnitureActions.loadFurnitureList());
  }, [dispatch, furnitureResult]);
  
  return (
    <div>
      <h2>Furniture</h2>
      <CarouselComponent/>
      {furnitureResult?.map((item) => (
        <div key={item.id}>
          <h3>{item.body}</h3>
          <p>{item.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FurniturePage;