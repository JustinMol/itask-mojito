import { TestBed } from '@angular/core/testing';

import { EditorFactoryResolver } from './editor.service';

describe('EditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditorFactoryResolver = TestBed.get(EditorFactoryResolver);
    expect(service).toBeTruthy();
  });
});
