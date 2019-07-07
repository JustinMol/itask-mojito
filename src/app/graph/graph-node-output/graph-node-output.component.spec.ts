import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphNodeOutputComponent } from './graph-node-output.component';

describe('GraphNodeOutputComponent', () => {
  let component: GraphNodeOutputComponent;
  let fixture: ComponentFixture<GraphNodeOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphNodeOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphNodeOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
