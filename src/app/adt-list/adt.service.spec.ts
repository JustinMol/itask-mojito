import { TestBed } from '@angular/core/testing';

import { AdtService } from './adt.service';

describe('AdtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdtService = TestBed.get(AdtService);
    expect(service).toBeTruthy();
  });
});
