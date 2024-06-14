import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toaster: ToastrService) {}
  showSuccess(message: string, title?: string, time: number = 4000) {
    this.toaster.success(message, title, {
      timeOut: time,
    });
  }
  showWarning(message: string, title?: string, time: number = 4000) {
    this.toaster.warning(message, title, {
      timeOut: time,
    });
  }
  showError(message: string, title?: string, time: number = 4000) {
    this.toaster.error(message, title, {
      timeOut: time,
    });
  }
}
