import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Especialista } from 'src/app/interfaces/especialista';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-tabla-especialistas',
  templateUrl: './tabla-especialistas.component.html',
  styleUrls: ['./tabla-especialistas.component.scss']
})
export class TablaEspecialistasComponent implements OnInit {

  @Output() especialistaEvent = new EventEmitter<Especialista>();
  
  especialistas : any = "";
  
  constructor(public fs : FirestoreService, private ts  : ToastrService) {
    this.fs.traerEspecialistas().subscribe(value =>{
      this.especialistas = value;
    });
   }

  ngOnInit(): void {
  }

  cambiarEstadoCuenta(especialista : any, estado : number)
  {
    if(estado == 1)
    {
      especialista.estadoCuenta = "Habilitada";
      this.fs.modificar(especialista,especialista.id).then(async () =>{
        this.ts.success("Se habilitó la cuenta del especialista","Cuenta Habilitada");
      })
      .catch((error : any)=>{
        this.ts.error("No se pudo habilitar la cuenta","Error");
      });
    }
    else
    {
      especialista.estadoCuenta = "Inhabilitada";
      this.fs.modificar(especialista,especialista.id).then(async () =>{
        this.ts.warning("Se inhabilitó la cuenta del especialista","Cuenta Inhabilitada");
      })
      .catch((error : any)=>{
        this.ts.error("No se pudo inhabilitar la cuenta","Error");
      });
    }
  }
}
