import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaEditComponent } from './prueba-edit.component';

describe('PruebaEditComponent', () => {
  let component: PruebaEditComponent;
  let fixture: ComponentFixture<PruebaEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
