import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostDrinkComponent } from './post-drink.component';

describe('PostDrinkComponent', () => {
  let component: PostDrinkComponent;
  let fixture: ComponentFixture<PostDrinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostDrinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostDrinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
