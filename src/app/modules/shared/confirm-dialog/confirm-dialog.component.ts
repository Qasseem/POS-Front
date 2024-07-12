import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, takeWhile } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'oc-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {
  private dialogSubscription: Subscription;
  private alive: boolean = true;
  show = false;
  ok: string;
  cancel: string;
  title: string;
  message: string;
  constructor(private dialogService: DialogService) {}

  ngOnInit() {
    this.dialogService.message
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.show = true;
        this.message = data.message;
        this.title = data.title;
        this.ok = data.ok;
        this.cancel = data.cancel;
      });
  }

  isOk() {
    this.show = false;
    this.dialogService.Ok();
  }

  isCancel() {
    this.show = false;
    this.dialogService.Cancel();
  }

  ngOnDestroy() {
    this.dialogSubscription.unsubscribe();
  }
}
