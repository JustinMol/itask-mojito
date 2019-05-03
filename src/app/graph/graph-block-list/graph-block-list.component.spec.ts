import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphBlockListComponent } from './graph-block-list.component';

describe('SourceListComponent', () => {
  let component: GraphBlockListComponent;
  let fixture: ComponentFixture<GraphBlockListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphBlockListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphBlockListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
