import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminalFavoriteListComponent } from './terminal-favorite-list.component';

describe('TerminalFavoriteListComponent', () => {
  let component: TerminalFavoriteListComponent;
  let fixture: ComponentFixture<TerminalFavoriteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminalFavoriteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TerminalFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
