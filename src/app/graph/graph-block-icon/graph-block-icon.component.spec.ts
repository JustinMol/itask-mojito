import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBlockIconComponent } from './graph-block-icon.component';

describe('GraphBlockIconComponent', () => {
  let component: GraphBlockIconComponent;
  let fixture: ComponentFixture<GraphBlockIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphBlockIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBlockIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
