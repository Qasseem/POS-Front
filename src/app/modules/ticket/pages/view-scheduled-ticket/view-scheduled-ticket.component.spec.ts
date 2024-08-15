import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewScheduledTicketComponent } from './view-scheduled-ticket.component';

describe('ViewScheduledTicketComponent', () => {
  let component: ViewScheduledTicketComponent;
  let fixture: ComponentFixture<ViewScheduledTicketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewScheduledTicketComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewScheduledTicketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
