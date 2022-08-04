import { TestBed } from '@angular/core/testing';

import { PacienteAdministradorGuard } from './paciente-administrador.guard';

describe('PacienteAdministradorGuard', () => {
  let guard: PacienteAdministradorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacienteAdministradorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
