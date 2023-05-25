import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from 'src/app/modules/translate/services/direction.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {
  lang!: string;
  constructor(private _DirectionService: DirectionService, private _TranslateService: TranslateService, private _Router:Router) {
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

  goBack() {
    this._Router.navigate(['/auth']);
  }
}
