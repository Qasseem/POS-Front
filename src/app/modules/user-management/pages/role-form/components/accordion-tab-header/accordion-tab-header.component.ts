import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'oc-accordion-tab-header',
  template: `
    <div class="accordion-header">
      <p-checkbox
        binary="true"
        [(ngModel)]="isChecked"
        (click)="onCheckboxClick($event)"
        (onChange)="toggleAll.emit(isChecked)"
      >
      </p-checkbox>
      <span
        >{{ header }} <span>{{ selectedCount }}/{{ totalCount }}</span>
      </span>
    </div>
  `,
  styleUrl: './accordion-tab-header.component.scss',
})
export class AccordionTabHeaderComponent {
  @Input() header: string;
  @Input() isChecked: boolean = false;
  @Input() totalCount: number;
  @Input() selectedCount: number;
  @Output() toggleAll: EventEmitter<boolean> = new EventEmitter<boolean>();

  onCheckboxClick(event: Event) {
    event.stopPropagation();
  }
}
