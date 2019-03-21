import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBlocksComponent } from './graph-blocks.component';

describe('SourceListComponent', () => {
  let component: GraphBlocksComponent;
  let fixture: ComponentFixture<GraphBlocksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphBlocksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBlocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
