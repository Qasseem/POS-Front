import { Component } from '@angular/core';
import { AppTranslateService } from './core/shared/services/translate.service';
import { Spinkit } from 'ng-http-loader';
import { StorageService } from './core/services/storage.service';

@Component({
  selector: 'oc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public spinkit = Spinkit;
  title = 'My Afaqy Customers';
  constructor(
    private appTranslateService: AppTranslateService,
    private storage: StorageService
  ) {
    this.appTranslateService.changeLangage(this.storage.getLang());
  }
}
