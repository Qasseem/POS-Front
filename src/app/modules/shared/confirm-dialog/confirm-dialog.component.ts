import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, takeWhile } from 'rxjs';
import { DialogService } from 'src/app/services/dialog.service';
import { ConfirmationService } from 'primeng/api';

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
  constructor(
    private dialogService: DialogService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {
    this.dialogSubscription = this.dialogService.message
      .pipe(takeWhile(() => this.alive))
      .subscribe((data) => {
        this.showConfirmDialog(data);
      });
  }
  showConfirmDialog(data: any) {
    this.confirmationService.confirm({
      message: data.message,
      header: data.title,
      accept: () => {
        this.dialogService.Ok();
      },
      reject: () => {
        this.dialogService.Cancel();
      },
      acceptLabel: data.ok,
      rejectLabel: data.cancel,
    });
  }

  ngOnDestroy() {
    this.alive = false;
    if (this.dialogSubscription) this.dialogSubscription.unsubscribe();
  }
}
