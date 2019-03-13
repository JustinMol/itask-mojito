import { TestBed } from '@angular/core/testing';

import { MonacoEditorService } from './monaco-editor.service';

describe('MonacoEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MonacoEditorService = TestBed.get(MonacoEditorService);
    expect(service).toBeTruthy();
  });
});
