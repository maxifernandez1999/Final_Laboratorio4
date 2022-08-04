import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './guards/admin.guard';
import { EspecialistaGuard } from './guards/especialista.guard';
import { LogedGuard } from './guards/loged.guard';
import { PacienteAdministradorGuard } from './guards/paciente-administrador.guard';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { EncuestaComponent } from './paginas/encuesta/encuesta.component';
import { ErrorAdminComponent } from './paginas/error-admin/error-admin.component';
import { ErrorEspecialistaComponent } from './paginas/error-especialista/error-especialista.component';
import { ErrorLogeoComponent } from './paginas/error-logeo/error-logeo.component';
import { ErrorPacienteAdministradorComponent } from './paginas/error-paciente-administrador/error-paciente-administrador.component';
import { ErrorPacienteEspecialistaComponent } from './paginas/error-paciente-especialista/error-paciente-especialista.component';
import { ErrorComponent } from './paginas/error/error.component';
import { EstadisticasComponent } from './paginas/estadisticas/estadisticas.component';
import { LoginComponent } from './paginas/login/login.component';
import { MiPerfilComponent } from './paginas/mi-perfil/mi-perfil.component';
import { MisTurnosComponent } from './paginas/mis-turnos/mis-turnos.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { PerfilesRegistroComponent } from './paginas/perfiles-registro/perfiles-registro.component';
import { RegistroAdminComponent } from './paginas/registro-admin/registro-admin.component';
import { SeccionPacientesComponent } from './paginas/seccion-pacientes/seccion-pacientes.component';
import { SolicitarTurnoComponent } from './paginas/solicitar-turno/solicitar-turno.component';
import { TablaEspecialistasComponent } from './paginas/tabla-especialistas/tabla-especialistas.component';
import { TablaPacientesComponent } from './paginas/tabla-pacientes/tabla-pacientes.component';
import { TurnosComponent } from './paginas/turnos/turnos.component';
import { EspecialidadesService } from './servicios/especialidades.service';

const routes: Routes = [
  { path: '', pathMatch:'full', redirectTo: 'bienvenido'},
  {path: 'registro', component: PerfilesRegistroComponent, data: { animation: 'RegistroPage' }},
  {path: 'bienvenido', component: BienvenidoComponent, data: { animation: 'BienvenidoPage' }},
  {path: 'login', component: LoginComponent, data: { animation: 'LoginPage' }},
  {path: 'usuarios', loadChildren: () => import('./modulos/usuarios/usuarios.module').then(m => m.UsuariosModule),canActivate: [LogedGuard,AdminGuard]},
  {path: 'perfil', component: MiPerfilComponent ,data: { animation: 'MiPerfilPage' }},
  {path: 'encuesta', component: EncuestaComponent ,data: { animation: 'MiPerfilPage' }},
  {path: 'turnos', loadChildren: () => import('./modulos/turnos/turnos.module').then(m => m.TurnosModule),canActivate: [LogedGuard]},
  {path: 'perfilGeneral', component: PerfilComponent,canActivate: [LogedGuard] ,data: { animation: 'PerfilGeneralPage' }},
  {path: 'pacientes', component: SeccionPacientesComponent,canActivate: [LogedGuard,EspecialistaGuard],data: { animation: 'PacientesPage' }},
  {path: 'estadisticas', component: EstadisticasComponent,canActivate: [LogedGuard,AdminGuard]},
  {path: 'errorLogeo', component: ErrorLogeoComponent,data: { animation: 'ErrorLogeoPage' }},
  {path: 'errorAdmin', component: ErrorAdminComponent,data: { animation: 'ErrorAdminPage' }},
  {path: 'errorEspecialista', component: ErrorEspecialistaComponent,data: { animation: 'ErrorEPage' }},
  {path: 'errorPacienteEspecialista', component: ErrorPacienteEspecialistaComponent,data: { animation: 'ErrorPEPage' }},
  {path: 'errorPacienteAdministrador', component: ErrorPacienteAdministradorComponent,data: { animation: 'ErrorPAPage' }},
  {path: '**', component: ErrorComponent,data: { animation: 'ErrorPage' }},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
