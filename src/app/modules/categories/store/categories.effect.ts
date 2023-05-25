import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {
  GetCategories,
  GetCategoriesFail,
  GetCategoriesSuccess,
  GetCategory,
  GetCategoryFail,
  GetCategoryProducts,
  GetCategoryProductsFail,
  GetCategoryProductsSuccess,
  GetCategorySuccess,
} from './categories.actions';
import { CategoriesService } from '../services/categories.service';

@Injectable()
export class CategoryEffects {
  constructor(private actions$: Actions, private _CategoriesService: CategoriesService) { }

  getCategoriesList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCategories),
      switchMap(() => {
        return this._CategoriesService.getCategories().pipe(
          switchMap((categoryList) =>
            of(GetCategoriesSuccess({ categoryList: categoryList }))
          ),
          catchError(() => of(GetCategoriesFail()))
        );
      })
    )
  );
  getCategoryProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetCategoryProducts),
      switchMap((action) => {
        return this._CategoriesService.getCategoryProducts(action.categoryName).pipe(
          switchMap((products) =>
            of(GetCategoryProductsSuccess({ products: products }))
          ),
          catchError(() => of(GetCategoryProductsFail()))
        );
      })
    )
  );


  // loadProducts$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(ProductActionTypes.LoadProducts),
  //     mergeMap(() =>
  //       this.productService.getProducts().pipe(
  //         map((products) => new LoadProductsSuccess({ products })),
  //         catchError((error) => of(new LoadProductsFailure({ error: error.message })))
  //       )
  //     )
  //   )
  // );
}
