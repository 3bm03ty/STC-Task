import { Subject } from 'rxjs';
import { Component } from '@angular/core';
import { LoaderService } from 'src/app/core/services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {
  constructor(private _LoaderService:LoaderService){
    this._LoaderService.isLoading.subscribe((val) => {
      console.log(val);
      
    })
  }
  isLoading: Subject<boolean> = this._LoaderService.isLoading;
}
