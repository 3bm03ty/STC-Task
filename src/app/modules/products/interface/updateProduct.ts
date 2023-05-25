import { Product } from "./product";

export interface UpdateProductAction {
    id: number;
    product: Product;
}