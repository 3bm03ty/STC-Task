import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from 'src/app/modules/translate/services/direction.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  lang!: string;
  constructor(private _DirectionService: DirectionService, private _TranslateService: TranslateService) {
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
}
