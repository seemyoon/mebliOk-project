import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { categoryService } from '../../services/categories.service';

export const loadCategoryList = createAsyncThunk(
  'categoriesSlice/loadCategoryList',
  async (_, thunkAPI) => {
    try {
      const res = await categoryService.getCategories();
      return thunkAPI.fulfillWithValue(res);
    } catch (e) {
      const axiosErr = e as AxiosError;
      return thunkAPI.rejectWithValue(axiosErr?.response?.data);
    }
  },
);