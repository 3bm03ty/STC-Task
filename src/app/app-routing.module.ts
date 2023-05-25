import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authRoutes } from './modules/auth/routes/auth-routes';
import { productsRoutes } from './modules/products/routes/products-routes';
import { categoriesRoutes } from './modules/categories/routes/categories-routes';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { NgxPermissionsGuard } from 'ngx-permissions';

const routes: Routes = [
  { path: '', redirectTo: authRoutes.auth, pathMatch: 'full' },
  { path: authRoutes.auth, loadChildren: () => import('./modules/auth/auth.module').then((m) => m.AuthModule) },
  {
    path: productsRoutes.products, canActivate: [ NgxPermissionsGuard], data: {
      permissions: {
        only: ['ADMIN'],
        redirectTo: `${authRoutes.auth}/${authRoutes.unauth}`,
      },
    }, loadChildren: () => import('./modules/products/products.module').then((m) => m.ProductsModule)
  },
  {
    path: categoriesRoutes.categories, canActivate: [ NgxPermissionsGuard], data: {
      permissions: {
        only: ['USER'],
        redirectTo: `${authRoutes.auth}/${authRoutes.unauth}`,
      },
    }, loadChildren: () => import('./modules/categories/categories.module').then((m) => m.CategoriesModule)
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
