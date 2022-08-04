import { Component, OnInit } from '@angular/core';
import * as fs from 'file-saver';
import { trigger,style,transition,animate,state } from '@angular/animations';
import { FirestoreService } from 'src/app/servicios/firestore.service';


@Component({
  selector: 'app-seccion-usuarios',
  templateUrl: './seccion-usuarios.component.html',
  styleUrls: ['./seccion-usuarios.component.scss'],
  animations: [
    trigger('enterState', [
      state('void',style({
        transform: 'translateY(100%)',
        opacity:0
      })),
      transition(':enter',[
        animate(250,style({
          transform:'translateY(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class SeccionUsuariosComponent implements OnInit {

  tipoUsuario : any = "";
  pacientes : any = "";
  especialistas : any = "";
  admins : any = "";
  usuarios : any = [];
  constructor(private fire : FirestoreService) 
  {
    this.usuarios = [];
    this.fire.traerPacientes().subscribe(value =>{
      this.pacientes = value;
      this.generarListadoUsuarios(this.pacientes);
    });

    this.fire.traerEspecialistas().subscribe(value =>{
      this.especialistas = value;
      this.generarListadoUsuarios(this.especialistas);
    });

    this.fire.traerAdmins().subscribe(value =>{
      this.admins = value;
      this.generarListadoUsuarios(this.admins);
    });

    this
  }

  ngOnInit(): void {
  }

  cargarTipo(tipo : number)
  {
    if(tipo == 1)
    {
      this.tipoUsuario = "paciente";
    }
    else
    {
      if(tipo == 2)
      {
        this.tipoUsuario = "especialista";
      }
      else
      {
        this.tipoUsuario = "admin";
      }
    }
  }

  generarExcel()
  {
    const Excel = require ('exceljs');
    let workbook  = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Listado de Usuarios");
    let encabezado = ["Nombre","Apellido","DNI","Edad","Mail","Perfil"];
    let filaEncabezado = worksheet.addRow(encabezado);
    let nombreArchivo = "Usuarios";

    for(let usuario of this.usuarios)
    {
      let fila = [usuario.nombre,usuario.apellido,usuario.dni,usuario.edad,usuario.mail,usuario.perfil];
      worksheet.addRow(fila);
    }

    workbook.xlsx.writeBuffer().then((data : any) =>{
      let blob = new Blob([data],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob,nombreArchivo + '.xlsx');
    })
    
  }

  generarListadoUsuarios(array : any)
  {
    for(let item of array)
    {
      this.usuarios.push(item);
    }
  }
}
