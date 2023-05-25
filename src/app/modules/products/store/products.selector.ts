import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { ProductListState } from './products.state';
export const selectProductsList = createSelector(
  (state: AppState) => state?.products,
  (state: ProductListState) => state?.productsList
);
export const selectProduct = createSelector(
  (state: AppState) => state?.products,
  (state: ProductListState) => state?.product
);
export const selectCreatedProductSuccessfully = createSelector(
  (state: AppState) => state?.products,
  (state: ProductListState) => state?.createProductSuccessfully
);

export const selectUpdatedProductSuccessfully = createSelector(
  (state: AppState) => state?.products,
  (state: ProductListState) => state?.updateProductSuccessfully
);

export const selectDeletedProductSuccessfully = createSelector(
  (state: AppState) => state?.products,
  (state: ProductListState) => state?.deleteProductSuccessfully
);
