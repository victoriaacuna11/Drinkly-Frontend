import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadingLoaderComponent } from './uploading-loader.component';

describe('UploadingLoaderComponent', () => {
  let component: UploadingLoaderComponent;
  let fixture: ComponentFixture<UploadingLoaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadingLoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadingLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
