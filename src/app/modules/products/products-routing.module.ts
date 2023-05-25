import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { UpdateProductComponent } from './components/update-product/update-product.component';
import { productsRoutes } from './routes/products-routes';

const routes: Routes = [
  { path: '', redirectTo: productsRoutes.products, pathMatch: 'full' },
  { path: productsRoutes.products, component: ProductsComponent },
  { path: productsRoutes.addProduct, component: AddProductComponent },
  { path: productsRoutes.updateProduct, component: UpdateProductComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
