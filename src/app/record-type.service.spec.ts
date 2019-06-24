import { TestBed } from '@angular/core/testing';

import { RecordTypeService } from './record-type.service';

describe('RecordTypeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RecordTypeService = TestBed.get(RecordTypeService);
    expect(service).toBeTruthy();
  });
});
