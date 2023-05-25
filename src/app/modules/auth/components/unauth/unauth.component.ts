import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from 'src/app/modules/translate/services/direction.service';

@Component({
  selector: 'app-unauth',
  templateUrl: './unauth.component.html',
  styleUrls: ['./unauth.component.scss']
})
export class UnauthComponent {
  lang!: string;

  constructor(private _Router:Router,private _DirectionService: DirectionService, private _TranslateService: TranslateService) {
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
