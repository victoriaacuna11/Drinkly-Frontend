import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AiudaComponent } from './aiuda.component';

describe('AiudaComponent', () => {
  let component: AiudaComponent;
  let fixture: ComponentFixture<AiudaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AiudaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AiudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
