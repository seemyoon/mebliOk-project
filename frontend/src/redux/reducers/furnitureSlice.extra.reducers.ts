import { createAsyncThunk } from '@reduxjs/toolkit';
import { furnitureService } from '../../services/furniture.service';
import { AxiosError } from 'axios';

export const loadFurnitureList = createAsyncThunk(
  'furnitureSlice/loadFurnitureList',
  async (_, thunkAPI) => {
    try {
      const res = await furnitureService.getFurniture();
      return thunkAPI.fulfillWithValue(res);
    } catch (e) {
      const axiosError = e as AxiosError;
      return thunkAPI.rejectWithValue(axiosError?.response?.data);
    }
  },
);

// todo ById