import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

interface ConfirmDialogData {
  type: string;
  title: string;
  message: string;
  ok: string;
  cancel: string;
  params: any;
  params2: any;
}

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogSubject = new Subject<any>();
  private result = new Subject<boolean>();

  confirm(
    message: string = 'Are you sure?',
    title: string = 'Confirmation',
    params: any = null,
    params2: any = null,
    ok: string = 'OK',
    cancel: string = 'Cancel'
  ) {
    this.dialogSubject.next({
      type: 'confirm',
      title: title,
      message: message,
      ok: ok,
      cancel: cancel,
      params: params,
      params2: params2,
    });
    return this.result.asObservable();
  }

  Ok() {
    this.result.next(true);
  }

  Cancel() {
    this.result.next(false);
  }

  get message(): Observable<any> {
    return this.dialogSubject.asObservable();
  }

  get response(): Observable<any> {
    return this.result.asObservable();
  }
}
