import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  constructor(private st : AngularFireStorage) { }


  subirImagen(archivo : string, datos : any)
  {
    return this.st.upload(archivo,datos);
  }

  referenciaArchivo(archivo : string)
  {
    return this.st.ref(archivo);
  }
}
