import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog.component';

@NgModule({
  imports: [CommonModule, MainRoutingModule, SharedModule],
  declarations: [MainComponent, ConfirmDialogComponent],
})
export class MainModule {}
