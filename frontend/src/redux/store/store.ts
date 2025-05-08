import { configureStore } from '@reduxjs/toolkit';
import { furnitureSlice } from '../slices/furnitureSlice';
import { useDispatch, useSelector } from 'react-redux';
import { shippingInfoSlice } from '../slices/shippingInfoSlice';
import { categoriesSlice } from '../slices/CategoriesSlice';

export const store = configureStore({
  reducer: {
    furnitureSliceState: furnitureSlice.reducer,
    shippingInfoState: shippingInfoSlice.reducer,
    categoryInfoState: categoriesSlice.reducer,
  },
});

type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

type AppSelector = ReturnType<typeof store.getState>
export const useAppSelector = useSelector.withTypes<AppSelector>();