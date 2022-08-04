import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BienvenidoComponent } from './paginas/bienvenido/bienvenido.component';
import { RegistroComponent } from './paginas/registro/registro.component';
import { LoginComponent } from './paginas/login/login.component';
import { SpinnerComponent } from './paginas/spinner/spinner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './../environments/environment';
import { PerfilesRegistroComponent } from './paginas/perfiles-registro/perfiles-registro.component';
import { RegistroAdminComponent } from './paginas/registro-admin/registro-admin.component';
import { TablaPacientesComponent } from './paginas/tabla-pacientes/tabla-pacientes.component';
import { TablaEspecialistasComponent } from './paginas/tabla-especialistas/tabla-especialistas.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import { ToastrModule } from 'ngx-toastr';
import { ErrorLogeoComponent } from './paginas/error-logeo/error-logeo.component';
import { ErrorAdminComponent } from './paginas/error-admin/error-admin.component';
import { NavbarComponent } from './paginas/navbar/navbar.component';
import { ErrorComponent } from './paginas/error/error.component';
import { TablaAdminsComponent } from './paginas/tabla-admins/tabla-admins.component';
import { SeccionUsuariosComponent } from './paginas/seccion-usuarios/seccion-usuarios.component';
import { SolicitarTurnoComponent } from './paginas/solicitar-turno/solicitar-turno.component';
import { MiPerfilComponent } from './paginas/mi-perfil/mi-perfil.component';
import { TurnosComponent } from './paginas/turnos/turnos.component';
import { MisTurnosComponent } from './paginas/mis-turnos/mis-turnos.component';
import { PerfilComponent } from './paginas/perfil/perfil.component';
import { ErrorPacienteEspecialistaComponent } from './paginas/error-paciente-especialista/error-paciente-especialista.component';
import { ErrorPacienteAdministradorComponent } from './paginas/error-paciente-administrador/error-paciente-administrador.component';
import { FechaPipe } from './pipes/fecha.pipe';
import { DiaPipe } from './pipes/dia.pipe';
import { HoraPipe } from './pipes/hora.pipe';
import { SeccionPacientesComponent } from './paginas/seccion-pacientes/seccion-pacientes.component';
import { ErrorEspecialistaComponent } from './paginas/error-especialista/error-especialista.component';
import { RouterModule } from '@angular/router';
import { EstadisticasComponent } from './paginas/estadisticas/estadisticas.component';
import { BtnsBienvenidoDirective } from './directivas/btns-bienvenido.directive';
import { CardsLoginDirective } from './directivas/cards-login.directive';
import { BtnUsuariosDirective } from './directivas/btn-usuarios.directive';
import { CapchaDirective } from './directivas/capcha.directive';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { IdiomsComponent } from './paginas/idioms/idioms.component';
import { EncuestaComponent } from './paginas/encuesta/encuesta.component';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [
    AppComponent,
    BienvenidoComponent,
    RegistroComponent,
    LoginComponent,
    SpinnerComponent,
    PerfilesRegistroComponent,
    RegistroAdminComponent,
    TablaPacientesComponent,
    TablaEspecialistasComponent,
    ErrorLogeoComponent,
    ErrorAdminComponent,
    NavbarComponent,
    ErrorComponent,
    TablaAdminsComponent,
    SeccionUsuariosComponent,
    SolicitarTurnoComponent,
    MiPerfilComponent,
    TurnosComponent,
    MisTurnosComponent,
    PerfilComponent,
    ErrorPacienteEspecialistaComponent,
    ErrorPacienteAdministradorComponent,
    SeccionPacientesComponent,
    ErrorEspecialistaComponent,
    EstadisticasComponent,
    BtnsBienvenidoDirective,
    CardsLoginDirective,
    BtnUsuariosDirective,
    CapchaDirective,
    IdiomsComponent,
    EncuestaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [FechaPipe,DiaPipe,HoraPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
