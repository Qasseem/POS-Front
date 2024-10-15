import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcDdlComponent } from './oc-ddl.component';

describe('OcDdlComponent', () => {
  let component: OcDdlComponent;
  let fixture: ComponentFixture<OcDdlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OcDdlComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OcDdlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
