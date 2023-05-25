import { Product } from "../interface/product";

export interface ProductListState {
  createProductSuccessfully: boolean;
  updateProductSuccessfully: boolean;
  deleteProductSuccessfully: boolean;
  productsList: Product[] | null;
  product: Product | null;
}

export const initialProductState: ProductListState = {
  createProductSuccessfully: false,
  updateProductSuccessfully: false,
  deleteProductSuccessfully: false,
  productsList: null,
  product: null,
};
