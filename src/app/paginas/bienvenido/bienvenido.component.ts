import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { IdiomService } from 'src/app/servicios/idiom.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.component.html',
  styleUrls: ['./bienvenido.component.scss']
})
export class BienvenidoComponent implements OnInit {

  language:string;
  constructor(private router : Router, public as : AuthService, private idiomService: IdiomService) { 
    this.language = "en";
  }

  ngOnInit(): void {
  }

  changeLanguage(lang: string){
    this.language = lang;
    this.idiomService.setLanguage(lang);
  }

  navegar(pagina : number)
  {
    switch(pagina)
    {
      case 1:
        this.router.navigateByUrl('login');
        break;

      case 2: 
        this.router.navigateByUrl('registro');
        break;
    }
  }
}
