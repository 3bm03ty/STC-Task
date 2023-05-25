import { createSelector } from '@ngrx/store';
import { CategoryListState } from './categories.state';
import { AppState } from 'src/app/shared/app.state';

export const selectCategories = createSelector(
  (state: AppState) => state?.category,
  (state: CategoryListState) => state?.categoryList
);
export const selectCategoryProductsList = createSelector(
  (state: AppState) => state?.category,
  (state: CategoryListState) => state?.productsCategory
);
export const selectCategory = createSelector(
  (state: AppState) => state?.category,
  (state: CategoryListState) => state?.category
);
