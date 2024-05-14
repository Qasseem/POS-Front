/* tslint:disable:no-unused-variable */

import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { TableCoreService } from './table-core.service';

describe('Service: TableCore', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TableCoreService]
    });
  });

  it('should ...', inject([TableCoreService], (service: TableCoreService) => {
    expect(service).toBeTruthy();
  }));
});
