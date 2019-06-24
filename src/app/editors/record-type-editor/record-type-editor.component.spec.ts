import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordTypeEditorComponent } from './record-type-editor.component';

describe('RecordTypeEditorComponent', () => {
  let component: RecordTypeEditorComponent;
  let fixture: ComponentFixture<RecordTypeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordTypeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordTypeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
