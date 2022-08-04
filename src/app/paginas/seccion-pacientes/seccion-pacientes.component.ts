import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { TurnoService } from 'src/app/servicios/turno.service';


@Component({
  selector: 'app-seccion-pacientes',
  templateUrl: './seccion-pacientes.component.html',
  styleUrls: ['./seccion-pacientes.component.scss']
})
export class SeccionPacientesComponent implements OnInit {

  pacientes : any = "";
  turnos : any = "";
  pacientesTurnos : any = [];
  pacientesFiltrados : any = [];
  mostrarPacientes : boolean = false;
  mostrarHC : boolean = false;
  pacienteSeleccionado : any = "";
  datosCargadosP : boolean;
  datosCargadosT : boolean ;
  arrayDias : any = [];
  ultimaAtencion : any = "";
  atenciones : any = [];
  mostrarAtenciones : boolean = false;


  constructor(public as : AuthService, private fs : FirestoreService, private ts : TurnoService) 
  {
    this.datosCargadosP = false;
    this.datosCargadosT = false;
  
    this.fs.traerPacientes().subscribe(value =>{
      this.pacientes = value;

      this.ts.traerTurnos().subscribe(value =>{
        this.turnos = value;
        this.cargarDatos();
      });
    });

  }

  ngOnInit(): void {
  }

  yaEstaEnArray(paciente : any)
  {
    let finded : boolean = false;
    for(let pac of this.pacientesTurnos)
    {
      if(pac.dni == paciente.dni)
      {
        finded = true;
      }
    }

    return finded;
  }

  listarPacientes()
  {
    if(this.datosCargadosP && this.datosCargadosP)
    {
      this.mostrarPacientes = !this.mostrarPacientes;
    }
    else
    {
      this.cargarDatos();
    }
  }

  mostrarHistoriaClinica(paciente : any)
  {
    this.pacienteSeleccionado = paciente;
    this.mostrarHC = !this.mostrarHC;
  }

  cargarDatos()
  {
    for(let turno of this.turnos) 
    {
      if(turno.estado == "Realizado" && turno.especialista.dni == this.as.logeado.dni)
      {
        if(!this.yaEstaEnArray(turno.paciente))
        {
          this.pacientesTurnos.push(turno.paciente);
        }
      }
    }

    for(let paciente of this.pacientes) 
    {
      for(let paciente2 of this.pacientesTurnos) 
      {
        if(paciente.dni == paciente2.dni)
        {
          this.pacientesFiltrados.push(paciente);
        }
      }  
    }

    this.mostrarPacientes = true;
  }

  cargarArrayDias(paciente : any)
  {
    this.pacienteSeleccionado = paciente;
    this.atenciones = [];
    
    if(!this.mostrarAtenciones)
    {
      for(let turno of this.turnos)
      {
        if(turno.paciente.dni == this.pacienteSeleccionado.dni && turno.estado == "Realizado" && turno.especialista.dni == this.as.logeado.dni)
        {
          this.arrayDias.push(turno.fecha.dia);
        }
      }
      
      for (let i = 0; i <= 2; i++)
      {
        this.agregarAteciones();  
      }

      this.mostrarAtenciones = true;
    }
    else
    {
      this.mostrarAtenciones = false;
      this.arrayDias = [];
      this.atenciones = [];
    }
  }

  agregarAteciones()
  {
    let dia : string;
    let mes : string;
    let array : any;
    let array2  : any;
    let diaUltimo : string;
    let mesUltimo : string;
    let arrayUltimo : any;
    let array2Ultimo  : any;
    
    this.ultimaAtencion = "";

    for (let i = 0; i < this.arrayDias.length; i++) 
    {
      if(i == 0)
      {
        this.ultimaAtencion = this.arrayDias[i];
      }
      else
      {
        array = this.arrayDias[i].split(" ");
        array2 = array[1].split("/");

        dia = array2[0];
        mes = array2[1];

        arrayUltimo = this.ultimaAtencion.split(" ");
        array2Ultimo = arrayUltimo[1].split("/");

        diaUltimo = array2Ultimo[0];
        mesUltimo = array2Ultimo[1];
        
        if(dia > diaUltimo && mes == mesUltimo)
        {
          this.ultimaAtencion = this.arrayDias[i];
        }   
        else
        {
          if(dia < diaUltimo && mes > mesUltimo)
          {
            this.ultimaAtencion = this.arrayDias[i];
          }
          else
          {
            if(dia > diaUltimo && mes > mesUltimo)
            {
              this.ultimaAtencion = this.arrayDias[i];
            }
          }
        }  
      }     
    }
    if(this.ultimaAtencion != "")
    {
      let indice : number = this.arrayDias.indexOf(this.ultimaAtencion,0);

      this.arrayDias.splice(indice,1);
      this.atenciones.push(this.ultimaAtencion);
    }

  }
}
