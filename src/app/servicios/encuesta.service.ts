import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  encuestaCollectionReference: any;
  turnos: Observable<any>;
  constructor(private angularF: AngularFirestore) {
    this.encuestaCollectionReference = this.angularF.collection('encuestas');
    this.turnos = this.encuestaCollectionReference.valueChanges({ idField: 'id' });
  }

  agregarEncuesta(encuesta: any) {
    return this.encuestaCollectionReference.add({ ...encuesta });
  }

  modificarEncuesta(encuesta : any, id : any) {
    return this.angularF.collection('encuestas').doc(id).update(encuesta);
  }
}
