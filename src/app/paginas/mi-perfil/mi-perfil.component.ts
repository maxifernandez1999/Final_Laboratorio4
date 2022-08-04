import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { HorariosService } from 'src/app/servicios/horarios.service';
import { Horario } from 'src/app/clases/horario';
import { HorarioEspecialidad } from 'src/app/clases/horario-especialidad';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { FechaPipe } from 'src/app/pipes/fecha.pipe';

@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.scss']
})
export class MiPerfilComponent implements OnInit {

  especialidadSeleccionada : any = "";
  dias : any = [];
  mostrarEspecialidades : boolean = false;
  datoABuscar : any = "";
  horarioCompleto : string[] = ["08:00","19:00"];
  horarioMañana : string[] = ["08:00","12:00"];
  horarioTarde : string[] = ["13:00","19:00"];
  horarioSabado : string[] = ["08:00","14:00"];
  horariosBd : any = "";
  usuarioActual : any = "";
  lunesSeleccionado : boolean = false;
  martesSeleccionado : boolean = false;
  miercolesSeleccionado : boolean = false;
  juevesSeleccionado : boolean = false;
  viernesSeleccionado : boolean = false;
  sabadoSeleccionado : boolean = false;
  todoElDiaSeleccionado : boolean = false;
  mananaSeleccionado : boolean = false;
  tardeSeleccionado : boolean = false;
  sabadoHorarioSeleccionado : boolean = false;
  diaEncontrado : boolean = false;
  horarioSeleccionado : string[] = [];
  horario! : Horario;
  horarioEspecialidad : any;
  horariosCargados : boolean = false;
  algunDia : boolean = false;
  especialistaConHorario : boolean = false;
  horarioAModificar : any = "";
  mostrarHC : boolean = false;
  historiasClinicasAFiltrar : any = [];
  historiasClinicas : any = [];
  diaDeEmision : any = [];
  diaDeEmisionParseado : any = "";
  hc : any = "";
  mostrarPDF : boolean = false;
    
  

  constructor(public as : AuthService, private hs : HorariosService, private ts : ToastrService, private router : Router, private fp : FechaPipe) {
    
    this.usuarioActual = this.as.logeado;
    this.horario = new Horario();
    this.hs.traerHorarios().subscribe(value => {
      this.horariosBd = value;
    });

    if(this.as.logeado.perfil == "paciente")
    {
      this.historiasClinicas = this.as.logeado.historiasClinicas;
      this.historiasClinicasAFiltrar = this.as.logeado.historiasClinicas;
    }
    
   }

  ngOnInit(): void {
  }

  seleccionarDia(diaAAgregar : number)
  {
    switch(diaAAgregar)
    {
      case 1:
        this.lunesSeleccionado = !this.lunesSeleccionado;
        break;
      case 2:
        this.martesSeleccionado = !this.martesSeleccionado;
        break;
      case 3:
        this.miercolesSeleccionado = !this.miercolesSeleccionado;
        break;
      case 4:
        this.juevesSeleccionado = !this.juevesSeleccionado;
        break;
      case 5:
        this.viernesSeleccionado = !this.viernesSeleccionado;
        break;
      case 6:
        this.sabadoSeleccionado = !this.sabadoSeleccionado;
        break;
    }

    for (let dia of this.dias) 
    {
      if(dia == diaAAgregar || this.dias.length == 0)
      {
        this.diaEncontrado = true;
      }
    }

    if(!this.diaEncontrado)
    {
      this.dias.push(diaAAgregar);
    }
    else
    {
      let indice : number;
      indice = this.dias.indexOf(diaAAgregar,0);
      this.dias.splice(indice,1);
    }
    
  }

  seleccionarHorario(horario : string)
  {
    switch(horario)
    {
      case "todoElDia":
        this.horarioSeleccionado = this.horarioCompleto;
        this.todoElDiaSeleccionado = true;
        this.mananaSeleccionado = false;
        this.tardeSeleccionado = false;
        this.sabadoSeleccionado = false;
        break;
      case "mañana":
        this.horarioSeleccionado = this.horarioMañana;
        this.todoElDiaSeleccionado = false;
        this.mananaSeleccionado = true;
        this.tardeSeleccionado = false;
        this.sabadoSeleccionado = false;
        break;
      case "tarde":
        this.horarioSeleccionado = this.horarioTarde;
        this.todoElDiaSeleccionado = false;
        this.mananaSeleccionado = false;
        this.tardeSeleccionado = true;
        this.sabadoSeleccionado = false;
        break;
      case "sabado":
        this.horarioSeleccionado = this.horarioSabado;
        this.todoElDiaSeleccionado = false;
        this.mananaSeleccionado = false;
        this.tardeSeleccionado = false;
        this.sabadoHorarioSeleccionado = true;
        break;
    }
  }

  ver()
  {
    this.mostrarHC = !this.mostrarHC;
    this.mostrarPDF = false;
  }
  cargarHorario()
  {
    this.horario.especialista = this.as.logeado;

    this.horarioEspecialidad = {
      dias: this.dias,
      nombre: this.especialidadSeleccionada.nombre,
      rangoHorario: this.horarioSeleccionado  
    }
    this.horario.horariosEspecialidad.push(this.horarioEspecialidad);

    this.resetear();
  }

  resetear()
  {
    this.dias = [];
    this.especialidadSeleccionada = "";
    this.lunesSeleccionado = false;
    this.martesSeleccionado = false;
    this.miercolesSeleccionado = false;
    this.juevesSeleccionado = false;
    this.viernesSeleccionado = false;
    this.sabadoSeleccionado = false;
    this.todoElDiaSeleccionado = false;
    this.mananaSeleccionado = false;
    this.tardeSeleccionado = false;
    this.sabadoHorarioSeleccionado = false;
    this.diaEncontrado = false;
    this.horarioSeleccionado = [];
    
  }

  yaTieneHorario()
  {
    for(let horario of this.horariosBd)
    {
      if(horario.especialista.dni == this.as.logeado.dni)
      {
        this.especialistaConHorario = true;
        this.horarioAModificar = horario;
        break;
      }
    }
  }

  subirHorario()
  {
    let id : number;
    
      this.yaTieneHorario();
      if(this.especialistaConHorario)
      {
        id = this.horarioAModificar.id;
        this.as.loading = true;
        this.hs.modificarHorario(this.horario,id).then(async () =>{
          setTimeout(() => {
            this.as.loading = false;
            this.ts.success("Se modificó el horario del especialista","Horario registrado");
            this.resetear(); 
            this.horario = new Horario();
          }, 1000);
        })
        .catch((error : any)=>{
          this.ts.error("No se pudo modificar el horario","Error");
        });
      }
      else
      {
        this.as.loading = true;
        this.hs.agregarHorario(this.horario).then(async () =>{
          setTimeout(() => {
            this.as.loading = false;
            this.ts.success("Se guardo el horario","Horario registrado");
            this.resetear(); 
            this.horario = new Horario();
          }, 1000);
        })
        .catch((error : any)=>{
          this.ts.error("No se pudo registrar el horario","Error");
        });
      }
  }

  logOut()
  {
    this.as.logOut();
    this.router.navigateByUrl('login');
  }

  imprimirPdf(): void {
    const DATA : any = document.getElementById("historiaClinica");
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 1,
    };
    html2canvas(DATA, options)
      .then((canvas) => {
        const img = canvas.toDataURL('image/PNG');

        const bufferX = 30;
        const bufferY = 30;
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
        return doc;
      })
      .then((docResult) => {
        docResult.save(this.as.logeado.nombre + this.as.logeado.apellido + ".pdf");
      });
  }

  buscar()
  {
    this.historiasClinicasAFiltrar = [];
    if(this.datoABuscar == "")
    {
      this.historiasClinicasAFiltrar = this.historiasClinicas;
    }
    else
    {
      this.historiasClinicasAFiltrar = this.historiasClinicas.filter((hc : any) => hc.especialidad.nombre.includes(this.datoABuscar));
    }
  }

  cargarDiaEmision()
  {
    this.diaDeEmision = [];  
    this.diaDeEmisionParseado = "";

    let dia : Date = new Date();

    this.diaDeEmision.push(dia.toUTCString().split(' ')[0] + 
                        dia.toUTCString().split(' ')[1] + ' ' + 
                        dia.toUTCString().split(' ')[2] + ' ' +
                        dia.toUTCString().split(' ')[3]);   
      
      
    this.diaDeEmisionParseado = this.fp.transform(this.diaDeEmision)[0];
  }

  previsualizarPDF(hc : any)
  {
    this.cargarDiaEmision();
    this.mostrarHC = false;
    this.hc = hc;
    this.mostrarPDF = true;
  }
}
