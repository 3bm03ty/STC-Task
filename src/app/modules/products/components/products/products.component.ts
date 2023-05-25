import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from 'src/app/modules/translate/services/direction.service';
import { AppState } from 'src/app/shared/app.state';
import { DeleteProduct, GetProducts, ResetToActions } from '../../store';
import { selectDeletedProductSuccessfully, selectProductsList } from '../../store/products.selector';
import { Product } from '../../interface/product';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ReplaySubject, Subject, filter, take, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
  lang!: string;
  ColumnMode = ColumnMode;

  products: Product[] = [];
  isLoading: Subject<boolean> = (this._LoaderService.isLoading);



  constructor(private _DirectionService: DirectionService, private _TranslateService: TranslateService,
    private store: Store<AppState>,
    private _LoaderService:LoaderService) {
    this.getDirection()
  }

  private readonly _destroyAll: ReplaySubject<unknown> =
    new ReplaySubject<unknown>();


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

  ngOnInit(): void {
    this.store.dispatch(GetProducts());
    this.store.pipe(select(selectProductsList)).subscribe((products: Product[] | null) => {
      this.products = products || [];
      console.log(products);
    });
  }

  borderClass(row: any) {
    return 'row-border';
  }


  public deleteProduct(id: number) {
    if (!id) return;

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      this.store
        .select(selectDeletedProductSuccessfully)
        .pipe(
          filter((deleted) => !!deleted),
          take(1),
          tap(() => {
            // this._toaster.success(
            //   this._translate.instant('productDeletedSuccessfully')
            // );
            this.store.dispatch(ResetToActions());
          })
        )
        .subscribe();
      if (result.isConfirmed) {
        Swal.fire(
          'Deleted!',
          'Product has been deleted.',
          'success'
        ).then(() => {
          this.store.dispatch(DeleteProduct({ id: id }));

        })
      }
    })



  }

  ngOnDestroy(): void {
    this._destroyAll.next(undefined);
    this._destroyAll.complete();
  }


  addNewProduct(){

  }


}
