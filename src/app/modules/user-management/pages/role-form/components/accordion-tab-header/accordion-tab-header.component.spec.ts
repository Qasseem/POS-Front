import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccordionTabHeaderComponent } from './accordion-tab-header.component';

describe('AccordionTabHeaderComponent', () => {
  let component: AccordionTabHeaderComponent;
  let fixture: ComponentFixture<AccordionTabHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionTabHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionTabHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
