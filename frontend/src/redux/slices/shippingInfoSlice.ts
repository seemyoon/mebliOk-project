import { createSlice } from '@reduxjs/toolkit';
import { IShippingInfo } from '../../interfaces/IShippingInfo';
import { loadShippingInfo } from '../reducers/shippingInfoSlice.extra.reducers';

type ShippingInfoType = {
  shippingInfo: IShippingInfo | null
  
}

const initialShippingInfoSliceState: ShippingInfoType = {
  shippingInfo: null,
};
export const shippingInfoSlice = createSlice({
  name: 'shippingInfoSlice',
  initialState: initialShippingInfoSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadShippingInfo.fulfilled, (state, action) => {
          state.shippingInfo = action.payload;
        },
      );
  },
});

export const shippingInfoActions = {
  ...shippingInfoSlice.actions,
  loadShippingInfo,
};
