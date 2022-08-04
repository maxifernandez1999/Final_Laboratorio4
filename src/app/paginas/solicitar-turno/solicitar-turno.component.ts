import { Component, OnInit } from '@angular/core';
import { Especialidad } from 'src/app/interfaces/especialidad';
import { Especialista } from 'src/app/interfaces/especialista';
import { Horario } from 'src/app/interfaces/horario';
import { Paciente } from 'src/app/interfaces/paciente';
import { EspecialidadesService } from 'src/app/servicios/especialidades.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { ToastrService } from 'ngx-toastr';
import { Turno } from 'src/app/interfaces/turno';
import { AuthService } from 'src/app/servicios/auth.service';
import { TurnoService } from 'src/app/servicios/turno.service';
import { isGeneratedFile } from '@angular/compiler/src/aot/util';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';
import { DiaPipe } from 'src/app/pipes/dia.pipe';


@Component({
  selector: 'app-solicitar-turno',
  templateUrl: './solicitar-turno.component.html',
  styleUrls: ['./solicitar-turno.component.scss']
})
export class SolicitarTurnoComponent implements OnInit {

  especialistas : any = "";
  pacientes : any = "";
  especialidades : any = "";
  horarios : any = "";
  tablaEspecialidades : boolean = false;
  tablaEspecialistas : boolean = false;
  tablaPacientes : boolean = false;
  especialidadSeleccionada : any = "";
  horarioEspecialista : any = ""; 
  especialistaSeleccionado : any = "";
  arrayEspecialistasTodos : any = [];
  turnos : any = "";
  turno : any = "";
  verTurnos : boolean = false;
  pacienteActual : any = "";
  pacienteCargado : boolean = false;
  todosLosTurnos : any;
  horarioEspecialidad : any = "";
  fecha : any = "";
  diasArray : any = [];
  diasArrayParseado : any = [];
  diasArrayFiltrados : any = [];
  horasArray : any = [];
  verHoras : boolean = false;
  diaSeleccionado : any = "";
  tieneHorarios : boolean = false;
  especialidadesEspecialista : any = [];
  arrayTurnoSegunDia : any = [];
  sinDias : boolean = false;

  constructor(private fs : FirestoreService, private hs : HorariosService, 
    private es : EspecialidadesService, private ts : ToastrService, 
    public as : AuthService, private turnoService : TurnoService, 
    private fp : FechaPipe, private dp : DiaPipe) 
    {
      this.especialistas = this.fs.especialistasArray;
      this.fecha = new Date();
      this.fs.traerEspecialistas().subscribe(value => {
        this.especialistas = value;
      });
      this.es.traerEspecialidades().subscribe(value => {
        this.especialidades = value;
      });
      this.hs.traerHorarios().subscribe(value => {
        this.horarios = value;
      });
      this.fs.traerPacientes().subscribe(value => {
        this.pacientes = value;
      });

      this.turnoService.traerTurnos().subscribe(value =>{
        this.todosLosTurnos = value;
      });
   }

  ngOnInit(): void {
  }

  cargarEspecialistas()
  {
    if(!this.tablaEspecialistas)
    {
      this.tablaEspecialistas = true;
      this.tablaPacientes = false;
      this.especialidadesEspecialista = [];
      this.tablaEspecialidades = false;
      this.diasArrayFiltrados = [];
      this.horasArray = [];
    }
    else
    {
      this.tablaEspecialistas = false;
    }

    this.horasArray = [];
    this.diasArrayFiltrados = [];
    this.especialidadSeleccionada = "";
  }

  asignarPaciente(paciente : Paciente)
  {
    this.pacienteActual = paciente;
    this.pacienteCargado = true;
    this.tablaPacientes = false;
  }

  cargarPacientes()
  {
    this.tablaPacientes = !this.tablaPacientes;  
  }

  filtrarHorarios()
  {
    for (let horario of this.horarios) 
    {
      for (let he of horario.horariosEspecialidad) 
      {
        if(horario.especialista.dni == this.especialistaSeleccionado.dni && he.nombre == this.especialidadSeleccionada.nombre)
        {
          this.horarioEspecialista = horario;  
          this.horarioEspecialidad = he;
          this.tieneHorarios = true;
        }
      }
    }
  }

  seleccionarEspecialista(especialista : any)
  {
    if(this.as.logeado.perfil == "paciente")
    {
      this.pacienteActual = this.as.logeado;
    }
    
    this.tablaEspecialistas = false;
    this.tablaEspecialidades = false;
    this.especialistaSeleccionado = especialista;
    this.listarEspecialidades();

    if(this.especialidadesEspecialista.length == 1)
    {
      this.especialidadSeleccionada = this.especialidadesEspecialista[0];
      this.filtrarHorarios();
  
      if(this.tieneHorarios)
      {
        this.mostrarTurnos();
        this.verTurnos = true;
      }
      else
      {
        this.ts.error("Ese especialista no tiene horarios","Especialista sin horarios");
      }
    }
    else
    {
      this.tablaEspecialidades = true;
    }
  }

  seleccionarEspecialidad(especialidad : any)
  {
    if(this.especialidadSeleccionada != "")
    {
      this.especialidadSeleccionada = especialidad;
      this.diasArrayFiltrados = [];
      this.horasArray = [];
    }
    this.especialidadSeleccionada = especialidad;
    this.tablaEspecialistas = false;
    this.filtrarHorarios();
    if(this.tieneHorarios)
    {
      this.mostrarTurnos();
      this.verTurnos = true;
    }
    else
    {
      this.ts.error("Ese especialista no tiene horarios","Especialista sin horarios");
    }
  }

  listarEspecialidades()
  {
    for(let especialidad of this.especialistaSeleccionado.especialidad)
    {
      this.especialidadesEspecialista.push(especialidad);
    }
  }
 
  estaElTurnoDisponible(fecha : any) {
    return !Boolean(this.todosLosTurnos.filter((turno : any) => turno.especialidad.nombre == this.especialidadSeleccionada.nombre && turno.especialista.dni == this.especialistaSeleccionado.dni && turno.fecha.dia === fecha.dia && turno.fecha.hora === fecha.hora && ["Aceptado", "Pendiente"].indexOf(turno.estado) != -1).length);
  }

  cargarDias()
  {
    this.diasArray = [];  

    let dia : Date = new Date();
    let dia2 : Date = new Date();

    for (let i = 0; i < 15; i++) 
    {
      if(dia2.toUTCString().split(' ')[0] !== "Sun,")
      {

        this.diasArray.push(dia2.toUTCString().split(' ')[0] + 
                            dia2.toUTCString().split(' ')[1] + ' ' + 
                            dia2.toUTCString().split(' ')[2] + ' ' +
                            dia2.toUTCString().split(' ')[3]);   
      }
      
      dia2.setDate(dia.getDate() + 1);
      dia.setDate(dia.getDate() + 1);
    }
  }

  filtrarDias()
  {
    this.diasArrayParseado = this.fp.transform(this.diasArray);
    
    for(let dia of this.diasArrayParseado) 
    {
      for(let diaEspecialidad of this.horarioEspecialidad.dias) 
      {
        let diaSplit = dia.split(' ');
        diaEspecialidad = this.dp.transform(diaEspecialidad);
        
        if(diaEspecialidad == diaSplit[0])
        {
          this.arrayTurnoSegunDia = this.todosLosTurnos.filter((turno : any) => turno.especialidad.nombre == this.especialidadSeleccionada.nombre && turno.especialista.dni == this.especialistaSeleccionado.dni && turno.fecha.dia === dia && turno.estado == "Pendiente");
          let horarios = this.cargarHoras(this.horarioEspecialidad.rangoHorario[0],this.horarioEspecialidad.rangoHorario[1]);
          
          if((horarios.length - this.arrayTurnoSegunDia.length) > 0)
          {
            let horas = this.cargarHoras(this.horarioEspecialidad.rangoHorario[0],this.horarioEspecialidad.rangoHorario[1],dia);
            if(horas.length == 1)
            {
              dia = dia + " " + horas[0];
            }

            this.diasArrayFiltrados.push(dia);
          }
        }
      }
    }
    
  }

  mostrarTurnos()
  {
    this.cargarDias();
    this.filtrarDias();

    if(this.diasArrayFiltrados.length == 1)
    {
      this.mostrarHorarios(this.diasArrayFiltrados[0])
    }
    else
    {
      if(this.diasArrayFiltrados.length == 0)
      {
        this.sinDias = true;
      }
      else
      {
        this.verTurnos = true;
      }
    }
  }

  mostrarHorarios(dia : any)
  {
    let arrayDia = dia.split(" ");
    
    if(arrayDia.length == 3)
    {
      this.diaSeleccionado = arrayDia[0] + " " + arrayDia[1];
      this.seleccionarTurno(arrayDia[2]);  
    }
    else
    {
      this.diaSeleccionado = dia;
      this.horasArray = this.cargarHoras(this.horarioEspecialidad.rangoHorario[0],this.horarioEspecialidad.rangoHorario[1]);
      this.verHoras = true;
    }
  }

  cargarHoras(entrada : string, salida : string, dia : string = "")
  {
    let entradaArray;
    let salidaArray;
    let horarios = [];
    let hora;
    let fecha;
    
    entradaArray = entrada.split(':');
    salidaArray = salida.split(':');

    hora = parseInt(entradaArray[0]);
    
    do
    {
      if(dia != "")
      {
        fecha = {
          dia : dia,
          hora : hora + ':' + entradaArray[1]
        }
      }
      else
      {
        fecha = {
          dia : this.diaSeleccionado,
          hora : hora + ':' + entradaArray[1]
        }
      }

      if(this.estaElTurnoDisponible(fecha))
      {
        horarios.push(hora + ':' + entradaArray[1]);  
      }

      if(entradaArray[1] == "00")
      {
        entradaArray[1] = "30";
      }
      else
      {
        if(entradaArray[1] == "30")
        {
          entradaArray[1] = "00";
          hora += 1;
        } 
      } 
    }
    while((hora <= parseInt(salidaArray[0]) - 1) || entradaArray[1] == "30");

    return horarios;
  }

  seleccionarTurno(hora : any)
  {
    this.fecha = {
      dia : this.diaSeleccionado,
      hora : hora
    }

    this.turno = {
      paciente : this.pacienteActual,
      especialista : this.especialistaSeleccionado,
      especialidad : this.especialidadSeleccionada,
      estado: "Pendiente",
      fecha : this.fecha
    }
   
    this.turnoService.agregarTurno(this.turno);
    
    this.as.loading = true
    setTimeout(() => {
      this.ts.success("Se ha cargado el turno","Turno solicitado exitosamente");
      this.as.loading = false;
    }, 2000);
    this.tablaPacientes = false;
    this.tablaEspecialidades = false;
    this.tablaEspecialistas = false;
    this.turnos = [];
    this.verTurnos = false;
    this.verHoras = false;
    this.pacienteCargado = false;
    this.pacienteActual = "";
    this.diasArrayFiltrados = [];
    this.horasArray = [];
    this.especialidadesEspecialista = [];
    this.diaSeleccionado = "";
    this.especialidadSeleccionada = "";
    this.especialistaSeleccionado = "";
    this.sinDias = false;
  }
  
}
