import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DrinklyTeamComponent } from './drinkly-team.component';

describe('DrinklyTeamComponent', () => {
  let component: DrinklyTeamComponent;
  let fixture: ComponentFixture<DrinklyTeamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DrinklyTeamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrinklyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
