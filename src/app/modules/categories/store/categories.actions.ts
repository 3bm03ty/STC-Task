import { createAction, props } from '@ngrx/store';
import { Product } from '../../products/interface/product';

export enum categoryActionEnum {
  //* GET CATEGORY  ACTIONS ENUM */
  LoadCategory = '[CATEGORY] GET CATEGORY',
  LoadCategorySuccess = '[CATEGORY] GET CATEGORY  SUCCESS',
  LoadCategoryFailure = '[CATEGORY] GET CATEGORY FAIL',
  //* GET CATEGORY  ACTIONS ENUM */
  LoadCategoryProducts = '[CATEGORY] GET CATEGORY PRODUCTS',
  LoadCategoryProductsSuccess = '[CATEGORY] GET CATEGORY PRODUCTS SUCCESS',
  LoadCategoryProductsFailure = '[CATEGORY] GET CATEGORY PRODUCTS FAIL',
  //* GET CATEGORIES  ACTIONS ENUM */
  LoadCategories = '[CATEGORY] GET CATEGORIES',
  LoadCategoriesSuccess = '[CATEGORY] GET CATEGORIES  SUCCESS',
  LoadCategoriesFailure = '[CATEGORY] GET CATEGORIES FAIL',
  //* RESET ACTION*/
  Reset = '[CATEGORY] RESET CATEGORY',
  ResetActions = '[CATEGORY] RESET CATEGORY ACTIONS',
}

//* GET CATEGORY  ACTIONS ENUM */
export const GetCategory = createAction(
  categoryActionEnum.LoadCategory,
  props<{ searchKeyword: string }>()
);
export const GetCategorySuccess = createAction(
  categoryActionEnum.LoadCategorySuccess,
  props<{ category: string }>()
);
export const GetCategoryFail = createAction(
  categoryActionEnum.LoadCategoryFailure
);
//* GET CATEGORY  ACTIONS ENUM */
export const GetCategoryProducts = createAction(
  categoryActionEnum.LoadCategoryProducts,
  props<{ categoryName: string }>()
);
export const GetCategoryProductsSuccess = createAction(
  categoryActionEnum.LoadCategoryProductsSuccess,
  props<{ products: Product[] }>()
);
export const GetCategoryProductsFail = createAction(
  categoryActionEnum.LoadCategoryProductsFailure
);
//* GET CATEGORIES ACTIONS ENUM */
export const GetCategories = createAction(categoryActionEnum.LoadCategories);
export const GetCategoriesSuccess = createAction(
  categoryActionEnum.LoadCategoriesSuccess,
  props<{ categoryList: string[] }>()
);
export const GetCategoriesFail = createAction(
  categoryActionEnum.LoadCategoriesFailure
);

export const ResetToDefault = createAction(categoryActionEnum.Reset);
export const ResetToActions = createAction(categoryActionEnum.ResetActions);
