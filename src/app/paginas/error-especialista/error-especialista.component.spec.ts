import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorEspecialistaComponent } from './error-especialista.component';

describe('ErrorEspecialistaComponent', () => {
  let component: ErrorEspecialistaComponent;
  let fixture: ComponentFixture<ErrorEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
