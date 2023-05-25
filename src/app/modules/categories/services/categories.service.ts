import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Product } from '../../products/interface/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HttpClient: HttpClient) { }

  public getCategories(): Observable<string[]> {
    return this._HttpClient.get<string[]>(`${environment.api}products/categories`);
  }

  public getCategoryProducts(categoryName: string): Observable<Product[]> {
    return this._HttpClient.get<Product[]>(`${environment.api}products/category/${categoryName}`);
  }
}
