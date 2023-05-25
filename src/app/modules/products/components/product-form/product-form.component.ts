import { map, tap } from 'rxjs/operators';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, filter, take, ReplaySubject, takeUntil } from 'rxjs';
import { selectCategories } from 'src/app/modules/categories/store/categories.selector';
import { DirectionService } from 'src/app/modules/translate/services/direction.service';
import { GetCategories } from 'src/app/modules/categories/store';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/app.state';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CreateProduct, GetProduct, UpdateProduct } from '../../store';
import { selectCreatedProductSuccessfully, selectProduct, selectProductsList, selectUpdatedProductSuccessfully } from '../../store/products.selector';
import { Product } from '../../interface/product';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnDestroy, OnInit {
  @Input() formTitle!: string;
  @Input() buttonType!: number;
  lang!: string;

  message: string = '';
  imagePath: string = '';
  profileImage!: any;
  url: any;
  profileImageIsLoading: boolean = false

  constructor(private _DirectionService: DirectionService, private _TranslateService: TranslateService,
    private _store: Store<AppState>, private _Router: Router, private _ActivatedRoute: ActivatedRoute,
    private domSanitizer: DomSanitizer) {
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

  public submit() {
    this.productForm.markAllAsTouched()
    if (this.productForm.valid) {
      if (this.buttonType == 0) {
        if (this.productForm.valid) {
          this._store.dispatch(CreateProduct({ payload: this.productForm.value }));
          this._store
            .select(selectCreatedProductSuccessfully)
            .pipe(
              filter((created) => !!created),
              take(1),
              tap(async () => {
                await this._Router.navigate(['/products']);
              })
            )
            .subscribe();
        }
      } else if (this.buttonType == 1) {
        const productId: number = +this._ActivatedRoute.snapshot.params['id'];
        this._store.dispatch(
          UpdateProduct({ id: productId, payload: this.productForm.value })
        );
        this._store
          .select(selectUpdatedProductSuccessfully)
          .pipe(
            filter((updated) => !!updated),
            take(1),
            tap(async () => {
              await this._Router.navigate(['/products']);
            })
          )
          .subscribe();
      }
    }

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

  private readonly product$: Observable<Product | null> = this._store
    .select(selectProduct)
    .pipe(
      filter((product) => !!product),
      take(1),
      tap((response) => {
        console.log(response);
        if (response) {

          this.productForm.patchValue(response);
          this.profileImage = response.image
        }
        this.profileImageIsLoading = false

      })
    );

  ngOnInit(): void {
    this._store.dispatch(GetCategories());

    if (this.buttonType == 1) {
      this.profileImageIsLoading = true
      const productId: number = +this._ActivatedRoute.snapshot.params['id'];
      this._store.dispatch(GetCategories());
      this._store.dispatch(GetProduct({ id: productId }));
      this.product$.subscribe();
      this.categories$.subscribe();
    }
  }

  onImageUpload(event: any) {
    const files = event.addedFiles;
    if (files.length === 0) return;
    this.profileImageIsLoading = true


    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    } else {
      this.message = '';
    }

    const reader = new FileReader();
    this.imagePath = files;

    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.url = reader.result;
      console.log(this.url, files[0]);

      this.uploadFile(this.url, files[0]);
    };
  }

  uploadFile(name: string, file: File) {
    let url = `api/Attachment/uploadFormFile`;
    let imgSize = environment.imgSize;
    let fileSize = file.size;
    console.log(fileSize);
    if (fileSize <= imgSize) {
      this.profileImageIsLoading = false
      const formData = new FormData();
      formData.append('file', file);
      this.profileImageIsLoading = true
      this.profileImageIsLoading = false
      this.profileImage = URL.createObjectURL(file);
      console.log(this.profileImage);
      this.productControls['image'].setValue(this.profileImage);
    } else {
      this.profileImageIsLoading = false
      this.message = 'Max image size that you can upload it is 5 Megabyte';
    }
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  private readonly _destroyAll: ReplaySubject<unknown> =
    new ReplaySubject<unknown>();
  public readonly productsList$: Observable<Product[] | null> =
    this._store.select(selectProductsList).pipe(
      filter((products) => !!products),
      takeUntil(this._destroyAll)
    );

  ngOnDestroy(): void {
    this._destroyAll.next(undefined);
    this._destroyAll.complete();
  }
}
