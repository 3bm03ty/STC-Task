import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './components/categories/categories.component';
import { categoriesRoutes } from './routes/categories-routes';

const routes: Routes = [
  { path: '', redirectTo: categoriesRoutes.categories, pathMatch: 'full' },
  { path: categoriesRoutes.categories, component: CategoriesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
