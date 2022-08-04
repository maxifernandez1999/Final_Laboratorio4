import { Component, OnInit } from '@angular/core';
import { Paciente } from 'src/app/interfaces/paciente';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import * as fs from 'file-saver';

@Component({
  selector: 'app-tabla-pacientes',
  templateUrl: './tabla-pacientes.component.html',
  styleUrls: ['./tabla-pacientes.component.scss']
})
export class TablaPacientesComponent implements OnInit {

  pacientes : any = "";
  pacienteSeleccionado : any = "";
  mostrarHC : boolean = false;
  constructor(private fs : FirestoreService) {
    this.cargarTabla();
   }

  ngOnInit(): void {
  }

  cargarTabla()
  {
    this.fs.traerPacientes().subscribe(value =>{
      this.pacientes = value;
    })
  }

  mostrarHistoriaClinica(paciente : any)
  {
    this.pacienteSeleccionado = paciente;
    this.mostrarHC = !this.mostrarHC;
  }

  generarExcelPaciente(paciente : any)
  {
    const Excel = require ('exceljs');
    let workbook  = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Listado de Consultas");
    let encabezado = ["Especialista","Especialidad","Fecha"];
    let filaEncabezado = worksheet.addRow(encabezado);
    let nombreArchivo = "Consultas de " + paciente.nombre + " " + paciente.apellido;

    for(let hc of paciente.historiasClinicas)
    {
      let fila = [hc.especialista.nombre + " " + hc.especialista.apellido,hc.especialidad.nombre,hc.fecha.dia + " " + hc.fecha.hora];
      worksheet.addRow(fila);
    }

    workbook.xlsx.writeBuffer().then((data : any) =>{
      let blob = new Blob([data],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob,nombreArchivo + '.xlsx');
    })
    
  }
}
