import { Component } from '@angular/core';
import { AppTranslateService } from './core/shared/services/translate.service';
import { Spinkit } from 'ng-http-loader';
import { StorageService } from './core/storage/storage.service';

@Component({
  selector: 'app-root',
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
