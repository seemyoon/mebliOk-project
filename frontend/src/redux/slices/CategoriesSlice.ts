import { createSlice } from '@reduxjs/toolkit';
import { ICategory } from '../../interfaces/ICategory';
import { loadCategoryList } from '../reducers/categorySlice.extra.reducers';

type CategoryResultType = {
  categoriesResult: ICategory[],
}

const initialCategoriesSliceState: CategoryResultType = {
  categoriesResult: [],
};

export const categoriesSlice = createSlice({
  name: 'categoriesSlice',
  initialState: initialCategoriesSliceState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadCategoryList.fulfilled, (state, action) => {
        state.categoriesResult = action.payload;
      });
  },
});

export const categoriesActions = {
  ...categoriesSlice.actions,
  loadCategoryList,
};