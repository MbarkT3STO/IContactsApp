/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { StringUtilService } from './StringUtil.service';

describe('Service: StringUtil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StringUtilService]
    });
  });

  it('should ...', inject([StringUtilService], (service: StringUtilService) => {
    expect(service).toBeTruthy();
  }));
});
