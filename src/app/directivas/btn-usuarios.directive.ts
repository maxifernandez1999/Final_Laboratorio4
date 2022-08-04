import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBtnUsuarios]'
})
export class BtnUsuariosDirective {

  //Seccion Usuarios Boton Generar Excel
  constructor(private el : ElementRef, private re : Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.re.setStyle(this.el.nativeElement,'background-color','rgba(65, 166, 249, 0.925)');
  }
 
  @HostListener('mouseleave') onMouseExit() {
    this.re.setStyle(this.el.nativeElement,'background-color','rgba(34, 123, 196, 0.925)');   
  }

}
