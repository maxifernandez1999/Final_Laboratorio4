import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPacientesComponent } from './tabla-pacientes.component';

describe('TablaPacientesComponent', () => {
  let component: TablaPacientesComponent;
  let fixture: ComponentFixture<TablaPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaPacientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
