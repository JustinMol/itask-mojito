import { TestBed } from '@angular/core/testing';

import { OptionTypeService } from './option-type.service';

describe('OptionTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OptionTypeService = TestBed.get(OptionTypeService);
    expect(service).toBeTruthy();
  });
});
