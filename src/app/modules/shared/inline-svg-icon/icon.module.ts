import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { InlineSVGModule } from 'ng-inline-svg';
import { IconComponent } from './icon.component';

@NgModule({
  imports: [CommonModule, InlineSVGModule],
  declarations: [IconComponent],
  exports: [IconComponent],
})
export class IconModule {}
