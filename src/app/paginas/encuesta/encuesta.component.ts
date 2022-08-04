import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/servicios/auth.service';
import { EncuestaService } from 'src/app/servicios/encuesta.service';

@Component({
  selector: 'app-encuesta',
  templateUrl: './encuesta.component.html',
  styleUrls: ['./encuesta.component.scss']
})
export class EncuestaComponent implements OnInit {

  form : FormGroup;

  starValue:number;
  radioValue:string;
  rangeValue:number;

  @ViewChild('star1') star1:any;
  @ViewChild('star2') star2:any;
  @ViewChild('star3') star3:any;
  @ViewChild('star4') star4:any;
  @ViewChild('star5') star5:any;

  @ViewChild('radio1') radio1:any;
  @ViewChild('radio2') radio2:any;


  constructor(private as : AuthService, private fb : FormBuilder, private renderer: Renderer2, private encuestaService: EncuestaService) { 
    this.form = this.fb.group({});
    this.starValue = 0;
    this.radioValue = "buena";
    this.rangeValue = 50;
    this.initForm();
  }

  ngOnInit(): void {

  }

  initForm(){
    this.form = this.fb.group({
      'comentario' : ['',Validators.required],
      'instalacion' : ['',[Validators.required]],
      'sino' : ['',[Validators.required]]
    });
  }

  agregarEncuesta(){
    let date: Date = new Date();
    let encuesta : any = {
      paciente: this.as.logeado.nombre + ' ' + this.as.logeado.apellido,
      fecha: date.getDate(),
      atencion : this.radioValue,
      stars : this.starValue,
      comentario: this.form.get("comentario")?.value,
      instalacion: this.form.get("instalacion")?.value,
      sino: this.form.get("sino")?.value
    }
    this.encuestaService.agregarEncuesta(encuesta).then((response : any) => {
      console.log(response);
    })
  }

  getCheck(valor: string){
    if(this.radio1.nativeElement.checked)
      this.radioValue = valor;
    if(this.radio2.nativeElement.checked)
      this.radioValue = valor;
    }

  addStar(star:string)
  {
    if(star === '1'){
      this.renderer.addClass(this.star1.nativeElement,"check");
      this.starValue = 1
    }
    if(star === '2'){
      this.renderer.addClass(this.star2.nativeElement,"check")
      this.starValue = 2
    }
    if(star === '3'){
      this.renderer.addClass(this.star3.nativeElement,"check")
      this.starValue = 3
    }
    if(star === '4'){
      this.renderer.addClass(this.star4.nativeElement,"check")
      this.starValue = 4
    }
    if(star === '5'){
      this.renderer.addClass(this.star5.nativeElement,"check")
      this.starValue = 5
    }
    
  }

 

}
