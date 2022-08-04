import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appCapcha]'
})
export class CapchaDirective {

  constructor(private elementRef:ElementRef){
    this.elementRef.nativeElement.value = Math.floor(Math.random() *  (500 - 100)) + 100;
  }

}
