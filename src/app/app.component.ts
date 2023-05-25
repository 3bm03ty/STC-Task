import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DirectionService } from './modules/translate/services/direction.service';
import { Subject } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'STC';

  language: any
  dir = 'rtl'

  isLoading: Subject<boolean> = (this._LoaderService.isLoading);


  constructor(private translate: TranslateService,
    private _DirectionService: DirectionService,
    private _LoaderService:LoaderService) {
    this.language = translate.currentLang
    translate.onLangChange.subscribe((lang) => {
      this.language = lang
    })

    this.getLanguage()
  }

  getLanguage() {
    let dir = localStorage.getItem('dir');

    var body = document.body;
    if (dir) {
      console.log(dir);
      if (dir == 'rtl') {
        this.translate.setDefaultLang('ar');
        localStorage.setItem('dir', 'rtl');
        this.translate.use('ar');
        this._DirectionService.dir.next('rtl');
        body.classList.add("directionRTL");
      } else {
        this.translate.setDefaultLang('en');
        localStorage.setItem('dir', 'ltr');
        this.translate.use('en');
        this._DirectionService.dir.next('ltr');
      }
    } else {
      this.translate.setDefaultLang('ar');
      localStorage.setItem('dir', 'rtl');
      this.translate.use('ar');
      this._DirectionService.dir.next('rtl');
    }
    this._DirectionService.dir.subscribe((res) => {
      this.dir = res
      if (this.dir == 'rtl') {
        body.classList.add("directionRTL");
        body.classList.remove("directionLTR");
      } else {
        body.classList.add("directionLTR");
        body.classList.remove("directionRTL");
      }
    })
  }


}
