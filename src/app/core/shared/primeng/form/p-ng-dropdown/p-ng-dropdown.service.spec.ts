/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PNgDropdownService } from './p-ng-dropdown.service';

describe('Service: PNgDropdown', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PNgDropdownService]
    });
  });

  it('should ...', inject([PNgDropdownService], (service: PNgDropdownService) => {
    expect(service).toBeTruthy();
  }));
});
