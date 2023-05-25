import { filter, take, tap, Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from 'src/app/modules/translate/services/direction.service';
import { AppState } from 'src/app/shared/app.state';
import { CreateProduct } from '../../store';
import { selectCreatedProductSuccessfully } from '../../store/products.selector';
import { Router } from '@angular/router';
import { selectCategories } from 'src/app/modules/categories/store/categories.selector';
import { map } from 'rxjs/operators';
import { GetCategories } from 'src/app/modules/categories/store';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  lang!: string;
  formTitle: string = "Add Product"
  buttonType = 0
  constructor(private _DirectionService: DirectionService, private _TranslateService: TranslateService,
    private _store: Store<AppState>, private _router: Router) {
    this.getDirection()


    let d = this._store.select(selectCategories).pipe(
      filter((categories) => !!categories),
      take(1),
      map((response) => {
        return (
          response?.map((category) => {
            return { name: category };
          }) || []
        );
      })
    );

    console.log(d);


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


  public productForm: FormGroup = new FormGroup<any>({
    title: new FormControl(null, [Validators.required]),
    description: new FormControl(null, [Validators.required]),
    category: new FormControl(null, [Validators.required]),
    price: new FormControl(null, [Validators.required]),
    image: new FormControl(null, [Validators.required]),
  });


  //get control
  get productControls(): any {
    return this.productForm.controls;
  }


  public addNewProduct() {

    console.log(this.productForm);

    if (this.productForm.valid) {
      this._store.dispatch(CreateProduct({ payload: this.productForm.value }));
      this._store
        .select(selectCreatedProductSuccessfully)
        .pipe(
          filter((created) => !!created),
          take(1),
          tap(async () => {
            console.log("Hiii");
            await this._router.navigate(['/products']);
          })
        )
        .subscribe();
    } else this.productForm.markAllAsTouched();
  }


  public readonly categories$: Observable<{ name: string }[] | null> =
    this._store.select(selectCategories).pipe(
      filter((categories) => !!categories),
      take(1),
      map((response) => {
        return (
          response?.map((category) => {
            return { name: category };
          }) || []
        );
      })
    );


  ngOnInit(): void {
    this._store.dispatch(GetCategories());
  }
}
