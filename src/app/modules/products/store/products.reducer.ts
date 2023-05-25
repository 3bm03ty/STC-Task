import { createReducer, on } from '@ngrx/store';
import * as productActions from './products.actions';
import { initialProductState } from './products.state';
export const ProductReducer = createReducer(
  initialProductState,
  on(productActions.CreateProductSuccess, (state) => {
    return {
      ...state,
      createProductSuccessfully: true,
    };
  }),
  on(productActions.CreateProductFail, (state) => {
    return {
      ...state,
      createProductSuccessfully: false,
    };
  }),
  on(productActions.UpdateProductSuccess, (state) => {
    return {
      ...state,
      updateProductSuccessfully: true,
    };
  }),
  on(productActions.UpdateProductFail, (state) => {
    return {
      ...state,
      updateProductSuccessfully: false,
    };
  }),
  on(productActions.DeleteProductSuccess, (state, { id }) => {
    return {
      ...state,
      productsList:
        state?.productsList?.filter((product) => product?.id !== id) || null,
      deleteProductSuccessfully: true,
    };
  }),
  on(productActions.DeleteProductFail, (state) => {
    return {
      ...state,
      deleteProductSuccessfully: false,
    };
  }),
  on(productActions.GetProductSuccess, (state, { products }) => {
    return {
      ...state,
      product: products,
    };
  }),
  on(productActions.GetProductFail, (state) => {
    return {
      ...state,
      product: null,
    };
  }),
  on(productActions.GetProductsSuccess, (state, { products }) => {
    return {
      ...state,
      productsList: products || null,
    };
  }),
  on(productActions.GetProductsFail, (state) => {
    return {
      ...state,
      productsList: null,
    };
  }),
  on(productActions.ResetToActions, (state) => {
    return {
      ...state,
      createProductSuccessfully: false,
      updateProductSuccessfully: false,
      deleteProductSuccessfully: false,
    };
  }),
  on(productActions.ResetToDefault, () => {
    return {
      productsList: null,
      product: null,
      createProductSuccessfully: false,
      updateProductSuccessfully: false,
      deleteProductSuccessfully: false,
    };
  })
);
