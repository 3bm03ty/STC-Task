import { createReducer, on } from '@ngrx/store';
import * as categoryActions from './categories.actions';
import { initialCategoryState } from './categories.state';

export const CategoryReducer = createReducer(
  initialCategoryState,
  on(categoryActions.GetCategorySuccess, (state, { category }) => {
    return {
      ...state,
      category: category,
    };
  }),
  on(categoryActions.GetCategoryFail, (state) => {
    return {
      ...state,
      product: null,
    };
  }),
  on(categoryActions.GetCategoryProductsSuccess, (state, { products }) => {
    return {
      ...state,
      productsCategory: products,
    };
  }),
  on(categoryActions.GetCategoryProductsFail, (state) => {
    return {
      ...state,
      productsCategory: null,
    };
  }),
  on(categoryActions.GetCategoriesSuccess, (state, { categoryList }) => {
    return {
      ...state,
      categoryList: categoryList || null,
    };
  }),
  on(categoryActions.GetCategoryFail, (state) => {
    return {
      ...state,
      categoryList: null,
    };
  }),
  on(categoryActions.ResetToDefault, () => {
    return {
      categoryList: null,
      category: null,
      productsCategory: null
    };
  })
);
