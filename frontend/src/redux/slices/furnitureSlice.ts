import { createSlice } from '@reduxjs/toolkit';
import { IFurniture } from '../../interfaces/IFurniture';
import { loadFurnitureList } from '../reducers/furnitureSlicee.extra.reducers';

type FurnitureResultType = {
  furnitureResult: IFurniture[]
}


const initialFurnitureSliceState: FurnitureResultType = {
  furnitureResult: [],
};


export const furnitureSlice = createSlice({
  name: 'furnitureSlice',
  initialState: initialFurnitureSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadFurnitureList.fulfilled, (state, action) => {
        state.furnitureResult = action.payload;
      });
  },
  
});

export const furnitureActions = {
  ...furnitureSlice.actions,
  loadFurnitureList,
};