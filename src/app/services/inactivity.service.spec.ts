/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { InactivityService } from './inactivity.service';

describe('Service: Inactivity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InactivityService],
    });
  });

  it('should ...', inject([InactivityService], (service: InactivityService) => {
    expect(service).toBeTruthy();
  }));
});
