import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  isLoading = new Subject<boolean>();

  constructor() { }



  show() {
    console.log("111");

    this.isLoading.next(true);
  }

  hide() {
    console.log("000");
    
    this.isLoading.next(false);
  }
}
