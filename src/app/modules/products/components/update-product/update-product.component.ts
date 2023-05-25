import { Observable, filter, take, tap } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { GetCategories } from 'src/app/modules/categories/store';
import { DirectionService } from 'src/app/modules/translate/services/direction.service';
import { AppState } from 'src/app/shared/app.state';
import { GetProduct } from '../../store';
import { Product } from '../../interface/product';
import { selectProduct } from '../../store/products.selector';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent{
  lang!: string;
  formTitle: string = "Update Product"
  buttonType = 1

  constructor(private _DirectionService: DirectionService, private _TranslateService: TranslateService,
    private _store: Store<AppState>,private _Router: Router,private _ActivatedRoute: ActivatedRoute) {
    this.getDirection()
  }

  


  //get direction
  getDirection() {
    this._DirectionService.dir.subscribe((res) => {
      if (res == 'rtl') {
        this._TranslateService.use('ar');
        this.lang = 'ar';
      } else {
        this._TranslateService.use('en');
        this.lang = 'en';
      }
    });
  }

}
