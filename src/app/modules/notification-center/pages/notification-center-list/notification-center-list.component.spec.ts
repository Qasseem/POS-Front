import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationCenterListComponent } from './notification-center-list.component';

describe('NotificationCenterListComponent', () => {
  let component: NotificationCenterListComponent;
  let fixture: ComponentFixture<NotificationCenterListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotificationCenterListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotificationCenterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
