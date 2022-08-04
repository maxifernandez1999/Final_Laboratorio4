import { TestBed } from '@angular/core/testing';

import { PacienteEspecialistaGuard } from './paciente-especialista.guard';

describe('PacienteEspecialistaGuard', () => {
  let guard: PacienteEspecialistaGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PacienteEspecialistaGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
