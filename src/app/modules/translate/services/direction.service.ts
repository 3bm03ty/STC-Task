import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DirectionService {
  dir = new BehaviorSubject<string>(' ');
  //isloadind = new BehaviorSubject<boolean>(true)
  constructor() {
    this.getDirection();
  }
  getDirection() {
    let cash = localStorage.getItem('dir');
    this.dir.next(cash || 'ltr')
  }
 /* getloading():boolean {
   return  this.isloadind.getValue()
  }*/
}
