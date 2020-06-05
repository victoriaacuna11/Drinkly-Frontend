import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinksFilterComponent } from './drinks-filter.component';

describe('DrinksFilterComponent', () => {
  let component: DrinksFilterComponent;
  let fixture: ComponentFixture<DrinksFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinksFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinksFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
