import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  constructor(public as : AuthService, private router : Router) { }

  ngOnInit(): void {
  }

  navegar(dato : number)
  {
    switch(dato)
    {
      case 1:
        this.router.navigate(['/perfil']);
        break;
      case 2:
        this.router.navigate(['/turnos/misTurnos']);
        break;
      case 3:
        this.router.navigate(['/turnos/gestionarTurnos']);
        break;
    }
  }
}
