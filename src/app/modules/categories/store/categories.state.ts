import { Product } from '../../products/interface/product';

export interface CategoryListState {
  categoryList: string[] | null;
  category: string | null;
  productsCategory: Product[] | null;
}

export const initialCategoryState: CategoryListState = {
  categoryList: null,
  category: null,
  productsCategory: null,
};
