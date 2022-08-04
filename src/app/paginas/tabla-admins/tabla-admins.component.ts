import { Component, OnInit } from '@angular/core';
import { FirestoreService } from 'src/app/servicios/firestore.service';

@Component({
  selector: 'app-tabla-admins',
  templateUrl: './tabla-admins.component.html',
  styleUrls: ['./tabla-admins.component.scss']
})
export class TablaAdminsComponent implements OnInit {

  admins : any = "";
  constructor(private fs : FirestoreService) {
    this.cargarTabla();
   }

  ngOnInit(): void {
  }

  cargarTabla()
  {
    this.fs.traerAdmins().subscribe(value =>{
      this.admins = value;
    })
  }

}
