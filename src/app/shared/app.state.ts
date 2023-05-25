import * as productStore from '../modules/products/store/index';
import * as categoryStore from '../modules/categories/store/index';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  [x: string]: any;
  products: productStore.ProductListState;
  category: categoryStore.CategoryListState;
}

export const reducers: ActionReducerMap<AppState> = {
  products: productStore.ProductReducer,
  category: categoryStore.CategoryReducer,
};

export const effects: any[] = [
  productStore.ProductEffects,
  categoryStore.CategoryEffects,
];
