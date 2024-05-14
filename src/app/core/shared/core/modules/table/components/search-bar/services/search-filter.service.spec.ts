/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SearchFilterService } from './search-filter.service';

describe('Service: SearchFilter', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchFilterService]
    });
  });

  it('should ...', inject([SearchFilterService], (service: SearchFilterService) => {
    expect(service).toBeTruthy();
  }));
});
