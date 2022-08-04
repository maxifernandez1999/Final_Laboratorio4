import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/servicios/auth.service';
import { FirestoreService } from 'src/app/servicios/firestore.service';
import { TurnoService } from 'src/app/servicios/turno.service';

@Component({
  selector: 'app-mis-turnos',
  templateUrl: './mis-turnos.component.html',
  styleUrls: ['./mis-turnos.component.scss']
})
export class MisTurnosComponent implements OnInit {

  turnos : any = "";
  pacientes : any = "";
  formComentario : FormGroup;
  formEncuesta : FormGroup;
  formFinalizado : FormGroup;
  formDatosDinamicos : FormGroup;
  todosLosTurnos : any = [];
  turnosFiltrados : any = "";
  turnosFiltradosEspecialista : any = "";
  especialidadBuscar : string = "";
  pacienteBuscar : string = "";
  especialistaBuscar : string = "";
  cancelado : boolean = false;
  verResena : boolean = false;
  encuesta : boolean = false;
  calificar : boolean = false;
  atencion : string = "";
  finalizado : boolean = false;
  rechazado : boolean = false;
  atencionAdministracion : string = "";
  respetoHorario : string = "";
  pacienteAModificar : any = "";
  datoABuscar : any = "";
  turnosFiltradosBusqueda : any = [];
  sino: string = 'Si';
  rangeValue:string = '50'
  dato1 : any = "";
  dato2 : any = "";
  dato3 : any = "";
  dato4 : any = "";
  dato5 : any = "";
  dato6 : any = "";

  constructor(public as : AuthService, private turnoService : TurnoService, 
    private fb : FormBuilder,private fb2 : FormBuilder,private fb3 : FormBuilder, 
    private ts : ToastrService, private fb4 : FormBuilder, private fs : FirestoreService) {
    this.formComentario = this.fb.group({
      'comentario' : ['',[Validators.required,Validators.maxLength(40),Validators.minLength(10)]]
    });
    this.formEncuesta = this.fb2.group({
      'agregado' : ['',[Validators.required,Validators.maxLength(40),Validators.minLength(10)]]
    });
    this.formFinalizado = this.fb3.group({
      'comentario' : ['',[Validators.required,Validators.maxLength(40),Validators.minLength(10)]],
      'diagnostico' : ['',[Validators.required,Validators.maxLength(60),Validators.minLength(15)]],
      'altura' : ['',[Validators.required]],
      'peso' : ['',[Validators.required]],
      'temperatura' : ['',[Validators.required]],
      'presion' : ['',[Validators.required]],
    });

    this.formDatosDinamicos = this.fb4.group({
      'dato' : [''],
      'valor' : [''],
      'datoRango' : [''],
      'valorRango' : [''],
      'datoNumerico' : [''],
      'valorNumerico' : [''],
      'datoSwitch' : [''],
      'valorSwitch' : [''],
    });

    this.turnoService.traerTurnos().subscribe(value => 
    {
        this.turnos = value;
        if(this.as.logeado.perfil == "paciente")
        {
          this.todosLosTurnos = this.turnos.filter((turno : any) => turno.paciente.dni == this.as.logeado.dni);
          this.turnosFiltrados = this.todosLosTurnos;
          this.turnosFiltradosBusqueda = this.todosLosTurnos;
        }
        else
        {
          if(this.as.logeado.perfil == "especialista")
          {
            this.todosLosTurnos = this.turnos.filter((turno : any) => turno.especialista.dni == this.as.logeado.dni);
            this.turnosFiltradosEspecialista = this.todosLosTurnos;
            this.turnosFiltradosBusqueda = this.todosLosTurnos;
          }
        }
    });

    this.fs.traerPacientes().subscribe(value =>
    {
      this.pacientes = value;
    });
   }

  ngOnInit(): void {
  }

  toggleButtonSiNo(){
    if(this.formDatosDinamicos.get('valorSwitch')?.value)
      this.sino = 'Si'
    else
      this.sino = 'No'
  }

  getRangeValue(){
    this.rangeValue = this.formDatosDinamicos.get('valorRango')?.value;
  }

  buscar()
  {
    this.todosLosTurnos = [];
    if(this.datoABuscar == "")
    {
      if(this.as.logeado.perfil == "paciente")
      {
        this.todosLosTurnos = this.turnosFiltrados
      }
      else
      {
        this.todosLosTurnos = this.turnosFiltradosEspecialista;
      }
    }
    else
    {
      for(let turno of this.turnosFiltradosBusqueda) 
      {
        if(turno.especialista.nombre.includes(this.datoABuscar) || turno.especialista.apellido.includes(this.datoABuscar))
        {
          this.todosLosTurnos.push(turno);
        }
        else
        {
          if(turno.especialidad.nombre.includes(this.datoABuscar))
          {
            this.todosLosTurnos.push(turno);
          }
          else
          {
            if(turno.paciente.nombre.includes(this.datoABuscar) || turno.paciente.apellido.includes(this.datoABuscar))
            {
              this.todosLosTurnos.push(turno);
            }
            else
            {
              if(turno.fecha.dia.includes(this.datoABuscar) || turno.fecha.hora.includes(this.datoABuscar))
              {
                this.todosLosTurnos.push(turno);
              }
              else
              {
                if(turno.estado.includes(this.datoABuscar))
                {
                  this.todosLosTurnos.push(turno);
                }
                else
                {
                  if(turno.historiaClinica != undefined)
                  {
                    if(turno.historiaClinica?.altura.includes(this.datoABuscar) || turno.historiaClinica?.peso.includes(this.datoABuscar) || turno.historiaClinica?.temperatura.includes(this.datoABuscar) || turno.historiaClinica?.presion.includes(this.datoABuscar))
                    {
                      this.todosLosTurnos.push(turno);
                    }
                    else
                    {
                      if(turno.historiaClinica.datoDinamico1 != "" && (turno.historiaClinica?.datoDinamico1?.clave.includes(this.datoABuscar) || turno.historiaClinica?.datoDinamico1?.valor.includes(this.datoABuscar)))
                      {
                        this.todosLosTurnos.push(turno);
                      }
                      else
                      {
                        if(turno.historiaClinica.datoDinamico2 != "" && (turno.historiaClinica?.datoDinamico2?.clave.includes(this.datoABuscar) || turno.historiaClinica?.datoDinamico2?.valor.includes(this.datoABuscar)))
                        {
                          this.todosLosTurnos.push(turno);
                        }
                        else
                        {
                          if(turno.historiaClinica.datoDinamico3 != "" && (turno.historiaClinica?.datoDinamico3?.clave.includes(this.datoABuscar) || turno.historiaClinica?.datoDinamico3?.valor.includes(this.datoABuscar)))
                          {
                            this.todosLosTurnos.push(turno);
                          }
                          else
                          {
                            if(turno.historiaClinica.datoDinamico4 != "" && (turno.historiaClinica?.datoDinamico4?.clave.includes(this.datoABuscar) || turno.historiaClinica?.datoDinamico4?.valor.includes(this.datoABuscar)))
                            {
                              this.todosLosTurnos.push(turno);
                            }
                            else
                            {
                              if(turno.historiaClinica.datoDinamico5 != "" && (turno.historiaClinica?.datoDinamico5?.clave.includes(this.datoABuscar) || turno.historiaClinica?.datoDinamico5?.valor.includes(this.datoABuscar)))
                              {
                                this.todosLosTurnos.push(turno);
                              }
                              else
                              {
                                if(turno.historiaClinica.datoDinamico6 != "" && (turno.historiaClinica?.datoDinamico6?.clave.includes(this.datoABuscar) || turno.historiaClinica?.datoDinamico6?.valor.includes(this.datoABuscar)))
                                {
                                  this.todosLosTurnos.push(turno);
                                }
                              }
                            }
                          }
                        }
                      }
                    }

                  }
                }
              }
            }
          }

        }
      }
     }    
  }

  modificarTurnoBD(turno : any, id : any)
  {
    return this.turnoService.modificarTurno(turno,id);
  }

  modificarPacienteBD(paciente : any, id : any)
  {
    return this.fs.modificarPaciente(paciente,id);
  }

  cancelarTurno(turno : any)
  {
    if(this.as.logeado.perfil == "paciente")
    {
      turno.estado = "Cancelado";
      turno.comentarioPaciente = this.formComentario.get("comentario")?.value;
    }
    else
    {
      if(this.as.logeado.perfil == "especialista")
      {
        if(this.cancelado)
        {
          turno.estado = "Cancelado";
          turno.comentarioEspecialista = this.formComentario.get("comentario")?.value;
        }
        else
        {
          if(this.rechazado)
          {
            turno.estado = "Rechazado";
            turno.comentarioEspecialista = this.formComentario.get("comentario")?.value;
          }
        }
      }
    }
    this.modificarTurnoBD({...turno}, turno.id).then((response : any) => {
      this.ts.success("Se ha cancelado el turno","Cancelado");
      this.cancelado = false;
      this.rechazado = false;
      this.formComentario.get("comentario")?.setValue('');
    })
    .catch((response : any) => {
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se canceló el turno","Error al cancelar");
      }, 1000);
      this.as.loading = false;
    });
  }

  cargarEncuesta(turno : any)
  {
    let encuestaAAgregar = {
      atencionAdministracion : this.atencionAdministracion,
      respetoHorarioConsulta : this.respetoHorario,
      agregado : this.formEncuesta.get("agregado")?.value
    }; 

    turno.encuesta = encuestaAAgregar;

    this.modificarTurnoBD({...turno}, turno.id).then((response : any) => {
     
      this.ts.success("Se ha cargado la encuesta","Encuesta");
      this.encuesta = false;
      this.formEncuesta.get("agregado")?.setValue('');
      this.atencionAdministracion = "";
      this.respetoHorario = "";
      
    })
    .catch((response : any) => {
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se cargo la encuesta","Error con la encuesta");
      }, 1000);
      this.as.loading = false;
    });
  }

  cargarCalificacion(turno : any)
  {
    turno.atencion = this.atencion;

    this.modificarTurnoBD({...turno}, turno.id).then((response : any) => {
      
      this.ts.success("Se ha cargado la calificación","Calificación");
      this.calificar = false;
      this.atencion = "";
    })
    .catch((response : any) => {
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se cargo la calificación","Error con la calificación");
      }, 1000);
      this.as.loading = false;
    });
  }

 
  finalizarTurno(turnoAModificar : any)
  {
    for(let paciente of this.pacientes) 
    {
      if(paciente.dni == turnoAModificar.paciente.dni)
      {
        this.pacienteAModificar = paciente;
        break;
      }  
    }
    let historiaClinica = {
      fecha : turnoAModificar.fecha,
      especialidad : turnoAModificar.especialidad,
      especialista : this.as.logeado,
      altura : this.formFinalizado.get("altura")?.value.toString(),
      peso : this.formFinalizado.get("peso")?.value.toString(),
      temperatura : this.formFinalizado.get("temperatura")?.value.toString(),
      presion : this.formFinalizado.get("presion")?.value.toString(),
      datoDinamico1 : this.dato1,
      datoDinamico2 : this.dato2,
      datoDinamico3 : this.dato3,
      datoDinamico4 : this.dato4,
      datoDinamico5 : this.dato5,
      datoDinamico6 : this.dato6,

    }

    this.cargarHistoriaClinica(this.pacienteAModificar,historiaClinica);
    
    for(let paciente of this.pacientes) 
    {
      if(paciente.dni == turnoAModificar.paciente.dni)
      {
        this.pacienteAModificar = paciente;
        break;
      }  
    }

    let turno = {
      paciente : this.pacienteAModificar,
      especialista : this.as.logeado,
      especialidad : turnoAModificar.especialidad,
      fecha : turnoAModificar.fecha,
      estado : "Realizado",
      comentarioEspecialista : this.formFinalizado.get("comentario")?.value,
      diagnostico : this.formFinalizado.get("diagnostico")?.value,
      historiaClinica : historiaClinica
    }

    this.modificarTurnoBD({...turno}, turnoAModificar.id).then((response : any) => {
      
      this.ts.success("Se ha finalizado el turno","Finalizado");
      this.finalizado = false;
      this.formDatosDinamicos.reset();
      this.formFinalizado.reset();
      this.formComentario.reset();
      this.dato1 = "";
      this.dato2 = "";
      this.dato3 = "";
      this.dato4 = "";
      this.dato5 = "";
      this.dato6 = "";
      
    })
    .catch((response : any) => {
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se realizo el turno","Error con la realización");
      }, 1000);
      this.as.loading = false;
    });
  }

  cargarHistoriaClinica(paciente : any,historiaClinica : any)
  {
    paciente.historiasClinicas.push(historiaClinica);

    this.modificarPacienteBD({...paciente},paciente.id).then((response : any) =>{

      this.ts.success("Se ha cargado la historia clínica","Historia Clínica");
    })
    .catch((response : any) => {
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se ha podido cargar la historia clínica","Error con la historia clínica");
      }, 1000);
      this.as.loading = false;
    });
  }

  datosExtrasAgregar()
  {
    let claveText = this.formDatosDinamicos.get("dato")?.value;
    let valorText = this.formDatosDinamicos.get("valor")?.value;

    let claveRango = this.formDatosDinamicos.get("datoRango")?.value;
    let valorRango = this.formDatosDinamicos.get("valorRango")?.value;

    let claveNumerico = this.formDatosDinamicos.get("datoNumerico")?.value;
    let valorNumerico = this.formDatosDinamicos.get("valorNumerico")?.value;

    let claveSwitch = this.formDatosDinamicos.get("datoSwitch")?.value;
    let valorSwitch = this.formDatosDinamicos.get("valorSwitch")?.value;

    console.log(claveRango)
    console.log(valorRango)
    if(this.dato1 == "")
    {
      this.dato1 = {
        clave : claveText,
        valor : valorText,
      }
    }
    else
    {
      if(this.dato2 == "")
      {
        this.dato2 = {
          clave : claveText,
          valor : valorText,
        }
      }
      else
      {
        if(this.dato3 == "")
        {
          this.dato3 = {
            clave : claveText,
            valor : valorText,
          }
        }
        else
        {
          if(this.dato4 == "")
          {
            this.dato4 = {
              clave : claveRango,
              valor : valorRango,
            }
          }
          else
          {
            if(this.dato5 == "")
            {
              this.dato5 = {
                clave : claveNumerico,
                valor : valorNumerico,
              }
            }
            else
            {
              if(this.dato6 == "")
              {
                this.dato6 = {
                  clave : claveSwitch,
                  valor : valorSwitch,
                }
              }
            }
          }
        }
      }
    }   
  }


  aceptarTurno(turno : any)
  {
    this.rechazado = false;
    this.cancelado = false;
    turno.estado = "Aceptado";

    this.modificarTurnoBD({...turno}, turno.id).then((response : any) => {
      
      this.ts.success("Se ha aceptado el turno","Aceptado");
    })
    .catch((response : any) => {
      setTimeout(() => {
        this.as.loading = true;
        this.ts.error("No se aceptó el turno","Error al aceptar el turno");
      }, 1000);
      this.as.loading = false;
    });
  }
}
