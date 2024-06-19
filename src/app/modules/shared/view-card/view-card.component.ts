import { Component, Input } from '@angular/core';

@Component({
  selector: 'oc-view-card',
  templateUrl: './view-card.component.html',
  styleUrl: './view-card.component.scss',
})
export class ViewCardComponent {
  @Input() details;
  @Input() formType;
  @Input() coordinates;
  @Input() cid = 'merchant';
  smallHeaderPath = '../../../../assets/icons/view-card-header-sm.svg';
  largeHeaderPath = '../../../../assets/icons/view-card-header-lg.svg';
}
