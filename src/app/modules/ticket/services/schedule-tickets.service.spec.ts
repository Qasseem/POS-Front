import { TestBed } from '@angular/core/testing';

import { ScheduleTicketsService } from './schedule-tickets.service';

describe('ScheduleTicketsService', () => {
  let service: ScheduleTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScheduleTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
