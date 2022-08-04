import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPacienteEspecialistaComponent } from './error-paciente-especialista.component';

describe('ErrorPacienteEspecialistaComponent', () => {
  let component: ErrorPacienteEspecialistaComponent;
  let fixture: ComponentFixture<ErrorPacienteEspecialistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPacienteEspecialistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPacienteEspecialistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
