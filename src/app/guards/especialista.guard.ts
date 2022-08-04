import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../servicios/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EspecialistaGuard implements CanActivate {

  constructor(private as : AuthService, private router : Router)
  {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      if(this.as.logeado.perfil === "especialista")
      {
        return true;
      }
      else
      {
        this.router.navigate(['/errorEspecialista']);
        return false;
      }
  }
  
}
