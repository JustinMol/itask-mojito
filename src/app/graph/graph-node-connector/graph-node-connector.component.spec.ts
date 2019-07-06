import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphNodeConnectorComponent } from './graph-node-connector.component';

describe('GraphNodeConnectorComponent', () => {
  let component: GraphNodeConnectorComponent;
  let fixture: ComponentFixture<GraphNodeConnectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphNodeConnectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphNodeConnectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
