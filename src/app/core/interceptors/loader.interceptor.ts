import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoaderService } from '../services/loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {
  private totalRequests = 0;

  constructor(private _loaderService: LoaderService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (!request.url.includes('uploadFormFile')) {
      this.totalRequests++;
      this._loaderService.show();
      return next.handle(request).pipe(
        finalize(() => {
          this.totalRequests--;
          if (this.totalRequests === 0) {
            console.log("finish");

            this._loaderService.hide();
          }
        })
      );
    }


    return next.handle(request).pipe(
      finalize(() => {
        console.log("finish");

        this._loaderService.hide();
      })
    );
  }
}
