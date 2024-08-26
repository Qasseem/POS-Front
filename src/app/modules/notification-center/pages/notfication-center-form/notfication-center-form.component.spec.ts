import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotficationCenterFormComponent } from './notfication-center-form.component';

describe('NotficationCenterFormComponent', () => {
  let component: NotficationCenterFormComponent;
  let fixture: ComponentFixture<NotficationCenterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NotficationCenterFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NotficationCenterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
