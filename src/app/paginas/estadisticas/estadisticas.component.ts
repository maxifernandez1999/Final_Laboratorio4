import { Component, OnInit } from '@angular/core';
import { TurnoService } from 'src/app/servicios/turno.service';
import Chart from 'chart.js/auto';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as fileSaver from 'file-saver';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';


@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.scss'],
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
export class EstadisticasComponent implements OnInit {

  form : FormGroup;
  turnos : any = "";
  especialidades : any = "";
  arraydias : any = [];
  arrayCantidades : any = [];
  mostrarGraficoDias : boolean = false;
  mostrarGraficoEspecialidades : boolean = false;  
  mostrarGraficoEspecialistas : boolean = false;  
  mostrarGraficoEspecialistas2 : boolean = false;  
  turnosPermitidos: any = [];
  turnosPermitidosEspecialidad: any = [];
  arrayEspecialidades: any = [];
  arrayCantidadesEspecialidad: any = [];
  especialistas : any = "";
  especialistas2 : any = "";
  arrayCantidadesEspecialistas: any = [];
  arrayCantidadesEspecialistasFinalizados: any = [];
  mostrarForm : boolean = false;
  arrayEspecialistas: any = [];
  turnosFinalizados : boolean = false;
  logs : any = "";
  mostrarLogs : boolean = false;
  fechaInicialSolicitados: any = "";
  fechaFinalSolicitados: any = "";
  fechaInicialFinalizados: any = "";
  fechaFinalFinalizados: any = "";
  diasDisabled : boolean = false;
  especialidadesDisabled : boolean = false;
  tsDisabled : boolean = false;
  tfDisabled : boolean = false;



  constructor(private ts : TurnoService, private es : EspecialidadesService, private fs : FirestoreService, private fb : FormBuilder) 
  {
    this.ts.traerTurnos().subscribe(value =>
    { 
      this.turnos = value;
      this.cargarDatos();

      this.es.traerEspecialidades().subscribe(value =>{
        this.especialidades = value;
        this.cargarDatosEspecialidades();
      });

      this.fs.traerEspecialistas().subscribe(value =>{
        this.especialistas = value;
      });
    });

    this.fs.traerLogs().subscribe(value =>{
      this.logs = value;
    });

    this.form = this.fb.group({
      'fechaInicial' : ['',Validators.required],
      'fechaFinal' : ['',Validators.required]
    });

  }

  ngOnInit(): void {
  }

  graficos(numero : number)
  {
    let arrayLabels : any = [];
    let arrayDatos : any = [];
    let id : any = "";
    switch(numero)
    {
      case 2:
        arrayDatos = [];
        arrayLabels = [];
        arrayLabels = this.arrayEspecialidades;
        arrayDatos = this.arrayCantidadesEspecialidad;
        id = document.getElementById("especialidades");
        this.mostrarGraficoEspecialidades = true;
        this.especialidadesDisabled = true;
        break;
      case 3:     
        if(!this.turnosFinalizados)
        {
          this.cargarDatosEspecialistas();
          arrayLabels = this.arrayEspecialistas;
          arrayDatos = this.arrayCantidadesEspecialistas;
          id = document.getElementById("especialistas");
          this.mostrarGraficoEspecialistas = true;
          this.mostrarForm = false; 
          this.fechaInicialSolicitados = this.form.get("fechaInicial")?.value;
          this.fechaFinalSolicitados = this.form.get("fechaFinal")?.value;
          this.tsDisabled = true;
        }
        else
        {
          this.cargarDatosEspecialistas();
          arrayDatos = this.arrayCantidadesEspecialistasFinalizados;
          arrayLabels = this.especialistas2;
          id = document.getElementById("especialistasFinalizados");
          this.mostrarGraficoEspecialistas2 = true;
          this.mostrarForm = false;
          this.turnosFinalizados = false;
          this.fechaInicialFinalizados= this.form.get("fechaInicial")?.value;
          this.fechaFinalFinalizados = this.form.get("fechaFinal")?.value;
          this.tfDisabled = true;
        }
        this.form.reset();
        break;
    }
   
    let colores : any = [];

    for(let i = 0; i <= arrayLabels.length; i++) 
    {
      let r = Math.floor(Math.random() * 255);
      let g = Math.floor(Math.random() * 255);
      let b = Math.floor(Math.random() * 255);
      let color = "rgb(" + r + "," + g + "," + b + ")"
      colores.push(color);
    }

    let oilCanvas : any = id;
    let oilData = {
      labels: arrayLabels,
      datasets: [
          {
              data: arrayDatos,
              backgroundColor: colores
          }]
    };
    
    let pieChart = new Chart(oilCanvas, {
      type: 'pie',
      data: oilData
    });
    
  }

  cargarDatos()
  {
    for(let turno of this.turnos)
    {
      if(!this.arraydias.includes(turno.fecha.dia) && (turno.estado != "Realizado" && turno.estado != "Rechazado" && turno.estado != "Cancelado"))
      {
        this.arraydias.push(turno.fecha.dia);
      }
    }

    this.turnosPermitidos = this.turnos.filter((turno : any) => turno.estado == "Pendiente" || turno.estado == "Aceptado");

    for(let i = 0; i < this.arraydias.length; i++) 
    {
      let contador = 0;
      for(let j = 0; j < this.turnosPermitidos.length; j++) 
      {
        let dia = this.arraydias[i].split(" ");
        let dia2 = this.turnosPermitidos[j].fecha.dia.split(" ");
        
        if(this.esIgual(dia2[1],dia[1]))
        {
          contador += 1;
        }
        if(this.esIgual(j,this.turnosPermitidos.length - 1))
        {
          this.arrayCantidades.push(contador);
        }
      }
    }    
  }

  cargarDatosEspecialidades()
  {
    for(let especialidad of this.especialidades)
    {
      if(!this.arrayEspecialidades.includes(especialidad.nombre))
      {
        this.arrayEspecialidades.push(especialidad.nombre);
      }
    }

    this.turnosPermitidosEspecialidad = this.turnos.filter((turno : any) => turno.estado == "Pendiente" || turno.estado == "Aceptado");

    for(let i = 0; i < this.arrayEspecialidades.length; i++) 
    {
      let contador = 0;

      for(let j = 0; j < this.turnosPermitidosEspecialidad.length; j++) 
      {      
        if(this.esIgual(this.arrayEspecialidades[i],this.turnosPermitidosEspecialidad[j].especialidad.nombre))
        {
          contador += 1;
        }
        if(this.esIgual(j,this.turnosPermitidosEspecialidad.length - 1))
        {
          this.arrayCantidadesEspecialidad.push(contador);
        }
      }
    }    
  }
  cargarDatosEspecialistas()
  {
    let fechaInicial = this.form.get("fechaInicial")?.value;
    let fechaFinal = this.form.get("fechaFinal")?.value;
    this.arrayEspecialistas = [];
   
    for(let especialista of this.especialistas)
    {
      if(!this.arrayEspecialistas.includes(especialista.nombre))
      {
        this.arrayEspecialistas.push(especialista.nombre + " " + especialista.apellido);
      }
    }
 
    this.especialistas2 = this.arrayEspecialistas;

    if(!this.turnosFinalizados)
    {
      for(let i = 0; i < this.especialistas.length; i++) 
      {
        let contador = 0;
  
        for(let j = 0; j < this.turnos.length; j++) 
        {      
          if(this.esIgual(this.especialistas[i].dni,this.turnos[j].especialista.dni))
          {
            let dia = this.turnos[j].fecha.dia.split(" ");
            
            if(dia[1] > fechaInicial && dia[1] < fechaFinal)
            {
              contador += 1;
            }
            else
            {
              if(dia[1] == fechaInicial || dia[1] == fechaFinal)
              {
                contador += 1;
              }
            }
          }
          if(this.esIgual(j,this.turnos.length - 1))
          {
            this.arrayCantidadesEspecialistas.push(contador);
          }
        }
      }    
    }
    else
    {
      let turnosFinalizados : any = this.turnos.filter((turno : any) => turno.estado === "Realizado");

      for(let i = 0; i < this.especialistas.length; i++) 
      {
        let contador = 0;
  
        for(let j = 0; j < turnosFinalizados.length; j++) 
        {      
          if(this.esIgual(this.especialistas[i].dni,turnosFinalizados[j].especialista.dni))
          {
            let dia = turnosFinalizados[j].fecha.dia.split(" ");
            
            if(dia[1] > fechaInicial && dia[1] < fechaFinal)
            {
              contador += 1;
            }
            else
            {
              if(dia[1] == fechaInicial || dia[1] == fechaFinal)
              {
                contador += 1;
              }
            }
          }
          if(this.esIgual(j,turnosFinalizados.length - 1))
          {
            this.arrayCantidadesEspecialistasFinalizados.push(contador);
          }
        }
      }
    }
  }
  esIgual(dato1 : any, dato2 : any)
  {
    if(dato1 === dato2)
    {
      return true;
    }
    return false
  }

  imprimirPdf(id : string): void {
 
    const DATA : any = document.getElementById(id);
    const doc = new jsPDF('p', 'pt', 'a4');
    let contador = 0;
    let array1 : any;
    let array2 : any;
    let nombreArchivo : string;
    let fechaInicial : any;
    let fechaFinal : any;
    let alto : number = 700;
    let ancho : number = 700;
    switch(id)
    {
      case "graficoBarrasDias":
        alto = 700;
        ancho = 800;
        nombreArchivo = "Turnos por dia";
        break;
      case "especialidades":
        array1 = this.arrayEspecialidades;
        array2 = this.arrayCantidadesEspecialidad;
        nombreArchivo = "Turnos por especialidad";
        break;
      case "especialistas":
        array1 = this.arrayEspecialistas;
        array2 = this.arrayCantidadesEspecialistas;
        nombreArchivo = "Turnos solicitados, por medicos";
        fechaInicial = this.fechaInicialSolicitados;
        fechaFinal = this.fechaFinalSolicitados;
        break;
      case "especialistasFinalizados":
        array1 = this.arrayEspecialistas;
        array2 = this.arrayCantidadesEspecialistasFinalizados;
        nombreArchivo = "Turnos finalizados, por medicos";
        fechaInicial = this.fechaInicialFinalizados;
        fechaFinal = this.fechaFinalFinalizados;
        break;
    }
    
   
    const options = {
      background: 'white',
      scale: 1,
      width: ancho,
      height: alto,
      };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        const bufferX = 1;
        const bufferY = 1;
        const imgProps = (doc as any).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
          );
          
          if(id == "especialistas" || id == "especialistasFinalizados")
          {
            doc.text("Entre " + fechaInicial + " y " + fechaFinal,10,350);
          }
          doc.text("Cantidad de turnos",10,400);
          let espacio = 420;
          
          for(let i = 0; i < array1.length; i++) 
          {
            for(let j = 0; j < array2.length; j++) 
            {
              doc.text(array1[contador] + ": " + array2[contador],10,espacio); 
              espacio += 20;
              contador++;
              break;
            }
            
          }
           
          return doc;
      })
      .then((docResult) => {
        docResult.save(nombreArchivo + ".pdf");
      });
  }

  generarExcel()
  {
    const Excel = require ('exceljs');
    let workbook  = new Excel.Workbook();
    let worksheet = workbook.addWorksheet("Listado de logs");
    let encabezado = ["Usuario","Dia","Hora"];
    let filaEncabezado = worksheet.addRow(encabezado);
    let nombreArchivo = "Logs";

    for(let log of this.logs)
    {
      let fila = [log.usuario.nombre + " " + log.usuario.apellido,log.dia,log.hora];
      worksheet.addRow(fila);
    }

    workbook.xlsx.writeBuffer().then((data : any) =>{
      let blob = new Blob([data],{ type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fileSaver.saveAs(blob,nombreArchivo + '.xlsx');
    })
    
  }

  cargarGraficoDias()
  {
    this.mostrarGraficoDias = true;
    var Highcharts = require('highcharts');  

    Highcharts.chart('graficoBarrasDias', {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Turnos por dia'
      },
      xAxis: {
        categories: this.arraydias,
        title: {
          text: 'Dias'
        }
      },
      yAxis: {
        min: 0,
        title: {
          text: 'Cantidad de turnos',
          align: 'high'
        },
        labels: {
          overflow: 'justify'
        }
      },
      tooltip: {
        valueSuffix: ' turnos'
      },
      plotOptions: {
        bar: {
          dataLabels: {
            enabled: true
          }
        }
      },
      series: [{
        name: 'Turnos',
        data: this.arrayCantidades,
        color: 'rgba(118, 29, 170, 0.925)'
      }]
    });
  }
}

