import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPacienteAdministradorComponent } from './error-paciente-administrador.component';

describe('ErrorPacienteAdministradorComponent', () => {
  let component: ErrorPacienteAdministradorComponent;
  let fixture: ComponentFixture<ErrorPacienteAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErrorPacienteAdministradorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorPacienteAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
