import { TestBed } from '@angular/core/testing';

import { ASTService } from './ast.service';

describe('AstService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ASTService = TestBed.get(ASTService);
    expect(service).toBeTruthy();
  });
});
