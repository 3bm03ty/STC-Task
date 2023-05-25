import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of, switchMap } from 'rxjs';
import {
  CreateProduct,
  CreateProductFail,
  CreateProductSuccess,
  DeleteProduct,
  DeleteProductFail,
  DeleteProductSuccess,
  GetProduct,
  GetProductFail,
  GetProducts,
  GetProductsFail,
  GetProductsSuccess,
  GetProductSuccess,
  UpdateProduct,
  UpdateProductFail,
  UpdateProductSuccess,
} from './products.actions';
import { catchError } from 'rxjs/operators';
import { ProductsService } from '../services/products.service';
@Injectable()
export class ProductEffects {
  constructor(private actions$: Actions, private _ProductsService: ProductsService) { }

  getProductsList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetProducts),
      switchMap(() => {
        return this._ProductsService.getProducts().pipe(
          switchMap((products) =>
            of(GetProductsSuccess({ products: products }))
          ),
          catchError(() => of(GetProductsFail()))
        );
      })
    )
  );
  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(GetProduct),
      switchMap((action) => {
        return this._ProductsService.getProduct(action?.id).pipe(
          switchMap((products) =>
            of(GetProductSuccess({ products: products }))
          ),
          catchError(() => of(GetProductFail()))
        );
      })
    )
  );
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CreateProduct),
      switchMap((action) => {
        return this._ProductsService.addProduct(action?.payload).pipe(
          switchMap((data) => of(CreateProductSuccess())),
          catchError(() => of(CreateProductFail()))
        );
      })
    )
  );
  updateProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UpdateProduct),
      switchMap((action) => {
        return this._ProductsService.updateProduct(action?.id, action?.payload).pipe(
          switchMap((data) =>
            of(UpdateProductSuccess({ payload: data }))
          ),
          catchError(() => of(UpdateProductFail()))
        );
      })
    )
  );
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DeleteProduct),
      switchMap((action) => {
        return this._ProductsService.DeleteProduct(action?.id).pipe(
          switchMap((data) => of(DeleteProductSuccess({ id: data?.id }))),
          catchError(() => of(DeleteProductFail()))
        );
      })
    )
  );
}
