import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostBusinessComponent } from './post-business.component';

describe('PostBusinessComponent', () => {
  let component: PostBusinessComponent;
  let fixture: ComponentFixture<PostBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostBusinessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
