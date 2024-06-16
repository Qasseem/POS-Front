import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketFavoriteListComponent } from './ticket-favorite-list.component';

describe('TicketFavoriteListComponent', () => {
  let component: TicketFavoriteListComponent;
  let fixture: ComponentFixture<TicketFavoriteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TicketFavoriteListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TicketFavoriteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
