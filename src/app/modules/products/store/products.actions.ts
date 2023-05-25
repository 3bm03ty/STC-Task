import { createAction, props } from '@ngrx/store';
import { Product } from '../interface/product';

export enum productActionEnum {
  //* CREATE PRODUCT  ACTIONS ENUM */
  CreateProduct = '[PRODUCT] CREATE PRODUCT',
  CreateProductSuccess = '[PRODUCT] CREATE PRODUCT  SUCCESS',
  CreateProductFailure = '[PRODUCT] CREATE PRODUCT FAIL',
  //* CREATE PRODUCT  ACTIONS ENUM */
  UpdateProduct = '[PRODUCT] UPDATE PRODUCT',
  UpdateProductSuccess = '[PRODUCT] UPDATE PRODUCT  SUCCESS',
  UpdateProductFailure = '[PRODUCT] UPDATE PRODUCT FAIL',
  //* DELETE PRODUCT  ACTIONS ENUM */
  DeleteProduct = '[PRODUCT] DELETE PRODUCT',
  DeleteProductSuccess = '[PRODUCT] DELETE PRODUCT  SUCCESS',
  DeleteProductFailure = '[PRODUCT] DELETE PRODUCT FAIL',
  //* GET PRODUCT  ACTIONS ENUM */
  LoadProduct = '[PRODUCT] GET PRODUCT',
  LoadProductSuccess = '[PRODUCT] GET PRODUCT  SUCCESS',
  LoadProductFailure = '[PRODUCT] GET PRODUCT FAIL',
  //* GET PRODUCTS  ACTIONS ENUM */
  LoadProducts = '[PRODUCT] GET PRODUCTS',
  LoadProductsSuccess = '[PRODUCT] GET PRODUCTS  SUCCESS',
  LoadProductsFailure = '[PRODUCT] GET PRODUCTS FAIL',
  //* RESET ACTION*/
  Reset = '[PRODUCT] RESET PRODUCT',
  ResetActions = '[PRODUCT] RESET PRODUCT ACTIONS',
}

//* CREATE PRODUCT  ACTIONS ENUM */
export const CreateProduct = createAction(
  productActionEnum.CreateProduct,
  props<{ payload: Product }>()
);
export const CreateProductSuccess = createAction(
  productActionEnum.CreateProductSuccess
);
export const CreateProductFail = createAction(
  productActionEnum.CreateProductFailure
);
//* UPDATE PRODUCT  ACTIONS ENUM */
export const UpdateProduct = createAction(
  productActionEnum.UpdateProduct,
  props<{ id: number; payload: Product }>()
);
export const UpdateProductSuccess = createAction(
  productActionEnum.UpdateProductSuccess,
  props<{ payload: Product }>()
);
export const UpdateProductFail = createAction(
  productActionEnum.UpdateProductFailure
);
//* DELETE PRODUCT  ACTIONS ENUM */
export const DeleteProduct = createAction(
  productActionEnum.DeleteProduct,
  props<{ id: number }>()
);
export const DeleteProductSuccess = createAction(
  productActionEnum.DeleteProductSuccess,
  props<{ id: number }>()
);
export const DeleteProductFail = createAction(
  productActionEnum.DeleteProductFailure
);
//* GET PRODUCT  ACTIONS ENUM */
export const GetProduct = createAction(
  productActionEnum.LoadProduct,
  props<{ id: number }>()
);
export const GetProductSuccess = createAction(
  productActionEnum.LoadProductSuccess,
  props<{ products: Product }>()
);
export const GetProductFail = createAction(productActionEnum.LoadProductFailure);
//* GET PRODUCTS ACTIONS ENUM */
export const GetProducts = createAction(productActionEnum.LoadProducts);
export const GetProductsSuccess = createAction(
  productActionEnum.LoadProductsSuccess,
  props<{ products: Product[] }>()
);
export const GetProductsFail = createAction(
  productActionEnum.LoadProductsFailure
);

export const ResetToDefault = createAction(productActionEnum.Reset);
export const ResetToActions = createAction(productActionEnum.ResetActions);
