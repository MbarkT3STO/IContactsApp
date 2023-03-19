/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { IdentityService } from './Identity.service';

describe('Service: Identity', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IdentityService]
    });
  });

  it('should ...', inject([IdentityService], (service: IdentityService) => {
    expect(service).toBeTruthy();
  }));
});
