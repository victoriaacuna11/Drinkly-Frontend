import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterParentComponent } from './filter-parent.component';

describe('FilterParentComponent', () => {
  let component: FilterParentComponent;
  let fixture: ComponentFixture<FilterParentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterParentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
