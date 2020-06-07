import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterChildComponent } from './filter-child.component';

describe('FilterChildComponent', () => {
  let component: FilterChildComponent;
  let fixture: ComponentFixture<FilterChildComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterChildComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
