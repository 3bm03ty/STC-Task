import { Component, TemplateRef, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from 'src/app/modules/translate/services/direction.service';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { GetCategories, GetCategoryProducts } from '../../store';
import { selectCategories, selectCategoryProductsList } from '../../store/categories.selector';
import { Observable, ReplaySubject, Subject, filter, takeUntil } from 'rxjs';
import { LoaderService } from 'src/app/core/services/loader.service';
import { MatDialog } from '@angular/material/dialog';
import { Product } from 'src/app/modules/products/interface/product';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit, OnDestroy {

  lang!: string;
  ColumnMode = ColumnMode;
  categories: any[] = [];

  isLoading: Subject<boolean> = (this._LoaderService.isLoading);


  constructor(private _DirectionService: DirectionService, private _TranslateService: TranslateService,
    private store: Store<AppState>,
    private _LoaderService: LoaderService,
    public dialog: MatDialog) {
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

  private _destroyAll: ReplaySubject<unknown> = new ReplaySubject<unknown>();


  public categoryProducts(
    categoryName: string,
    content: TemplateRef<ElementRef>
  ) {
    this.store.dispatch(GetCategoryProducts({ categoryName: categoryName }));
    this.dialog.open(content, {
      height: '90vh',
      width: '100%',
      enterAnimationDuration: 200,
    });
    
  }

  public readonly categoryProductsList$: Observable<Product[] | null> =
    this.store.select(selectCategoryProductsList).pipe(
      filter((products) => !!products),
      takeUntil(this._destroyAll)
    );



  ngOnInit(): void {
    this.store.dispatch(GetCategories());
    this.store.pipe(select(selectCategories)).subscribe((categories: any) => {
      categories = categories?.map((str: any, index: any) => { return { id: index, value: str } })
      this.categories = categories;
      console.log(categories);
    });
  }

  ngOnDestroy(): void {
    this._destroyAll.next(undefined);
    this._destroyAll.complete();
  }


  borderClass(row: any) {
    return 'row-border';
  }
}
