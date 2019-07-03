import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphNodeButtonComponent } from './graph-node-button.component';

describe('GraphNodeButtonComponent', () => {
  let component: GraphNodeButtonComponent;
  let fixture: ComponentFixture<GraphNodeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphNodeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphNodeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
