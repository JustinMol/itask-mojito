import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeFrameComponent } from './code-frame.component';

describe('CodeFrameComponent', () => {
  let component: CodeFrameComponent;
  let fixture: ComponentFixture<CodeFrameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CodeFrameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeFrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
