import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root',
})

/**
 * Loading Interceptor
 * An Interceptor for handling the show / hide loading with each http request
 */
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loading: NgxSpinnerService) {}

  /**
   * Show the Loading with lazy dismiss
   */
  async enableLoading() {
    await this.loading.show();
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.enableLoading();

    return next.handle(request).pipe(
      finalize(() => {
        this.loading.hide();
        setTimeout(() => this.loading.hide(), 5000);
      })
    );
  }
}
