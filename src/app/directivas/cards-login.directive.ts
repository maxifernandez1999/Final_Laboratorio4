import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCardsLogin]'
})
export class CardsLoginDirective {

  //Cards con los perfiles para el logeo rápido, Login
  constructor(private el : ElementRef, private re : Renderer2) { }

  @HostListener('mouseenter') onMouseEnter() {
    this.re.setStyle(this.el.nativeElement,'border-width','2px'); 
  }

  @HostListener('mouseleave') onMouseExit() {
    this.re.setStyle(this.el.nativeElement,'border-width','1px');   
  }

}
