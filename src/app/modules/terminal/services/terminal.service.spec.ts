/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TerminalService } from './terminal.service';

describe('Service: Terminal', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TerminalService]
    });
  });

  it('should ...', inject([TerminalService], (service: TerminalService) => {
    expect(service).toBeTruthy();
  }));
});
