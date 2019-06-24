import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionTypeEditorComponent } from './option-type-editor.component';

describe('OptionTypeEditorComponent', () => {
  let component: OptionTypeEditorComponent;
  let fixture: ComponentFixture<OptionTypeEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionTypeEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionTypeEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
