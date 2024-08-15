import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledTicketsListComponent } from './scheduled-tickets-list.component';

describe('ScheduledTicketsListComponent', () => {
  let component: ScheduledTicketsListComponent;
  let fixture: ComponentFixture<ScheduledTicketsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledTicketsListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduledTicketsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
