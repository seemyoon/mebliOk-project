import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store/store';
import { furnitureActions } from '../../redux/slices/furnitureSlice';

const FurniturePage = () => {
  
  const dispatch = useAppDispatch();
  const { furnitureResult } = useAppSelector(state => state.furnitureSliceState);
  
  useEffect(() => {
    dispatch(furnitureActions.loadFurnitureList());
  }, [dispatch, furnitureResult]);
  
  return (
    <div>
      <h2>Furniture</h2>
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