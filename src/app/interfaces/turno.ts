import { Especialista } from "./especialista";
import { Especialidad } from "./especialidad";
import { Paciente } from "./paciente";

export interface Turno {

    paciente : Paciente;
    especialista : Especialidad,
    especialidad : Especialidad;
    fecha : any;
    estado : string;
    comentario : string;
    encuesta : any;
}
