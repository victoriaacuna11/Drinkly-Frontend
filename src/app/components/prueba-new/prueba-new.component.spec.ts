import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaNewComponent } from './prueba-new.component';

describe('PruebaNewComponent', () => {
  let component: PruebaNewComponent;
  let fixture: ComponentFixture<PruebaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
