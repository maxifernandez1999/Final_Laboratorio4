import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { IdiomService } from 'src/app/servicios/idiom.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @Input('lang') lang:string
  constructor(public as : AuthService, private router : Router, private idiomService:IdiomService) {
    this.lang = "en";
  }

  ngOnInit(): void {
  }

  logOut()
  {
    this.as.logOut();
    this.router.navigateByUrl('login');
  }

}
