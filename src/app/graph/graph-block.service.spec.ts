import { TestBed } from '@angular/core/testing';

import { GraphBlockService } from './graph-block.service';

describe('SourceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GraphBlockService = TestBed.get(GraphBlockService);
    expect(service).toBeTruthy();
  });
});
