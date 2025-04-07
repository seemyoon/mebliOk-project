import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { shippingInfoService } from '../../services/shippingInfo.service';

export const loadShippingInfo = createAsyncThunk(
  'shippingInfoSlice/loadShippingInfo',
  async (_, thunkAPI) => {
    try {
      const res = await shippingInfoService.getShippingInfo()
      return thunkAPI.fulfillWithValue(res)
    } catch (e) {
      const axiosError = e as AxiosError;
      return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },
);