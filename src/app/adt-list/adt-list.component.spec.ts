import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdtListComponent } from './adt-list.component';

describe('AdtListComponent', () => {
  let component: AdtListComponent;
  let fixture: ComponentFixture<AdtListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdtListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
