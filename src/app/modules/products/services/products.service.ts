import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interface/product';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HttpClient: HttpClient) { }

  public getProducts(): Observable<Product[]> {
    return this._HttpClient.get<Product[]>(environment.api + "products");
  }

  public getProduct(productId: number): Observable<Product> {
    return this._HttpClient.get<Product>(`${environment.api}products/${productId}`);
  }

  public addProduct(product: Product): Observable<Product> {
    return this._HttpClient.post<Product>(`${environment.api}products`, product);
  }

  public updateProduct(productId: number, payload: Product): Observable<Product> {
    return this._HttpClient.put<Product>(`${environment.api}products/${productId}`, payload);
  }


  public DeleteProduct(productId: number): Observable<Product> {
    return this._HttpClient.delete<Product>(`${environment.api}products/${productId}`);
  }
}
