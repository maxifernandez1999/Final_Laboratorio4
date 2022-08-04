import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistroAdminComponent } from 'src/app/paginas/registro-admin/registro-admin.component';
import { SeccionUsuariosComponent } from 'src/app/paginas/seccion-usuarios/seccion-usuarios.component';
import { TablaAdminsComponent } from 'src/app/paginas/tabla-admins/tabla-admins.component';
import { TablaEspecialistasComponent } from 'src/app/paginas/tabla-especialistas/tabla-especialistas.component';
import { TablaPacientesComponent } from 'src/app/paginas/tabla-pacientes/tabla-pacientes.component';

const routes: Routes = [
  {path: 'registroAdmin',component: RegistroAdminComponent},
  {path: 'todosLosUsuarios',component: SeccionUsuariosComponent,data: { animation: 'UsuariosPage' }},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
