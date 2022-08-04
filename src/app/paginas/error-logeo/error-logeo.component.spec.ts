import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorLogeoComponent } from './error-logeo.component';

describe('ErrorLogeoComponent', () => {
  let component: ErrorLogeoComponent;
  let fixture: ComponentFixture<ErrorLogeoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorLogeoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorLogeoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
