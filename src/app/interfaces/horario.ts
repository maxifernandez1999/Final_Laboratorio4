import { HorarioEspecialidad } from "./horario-especialidad";
import { Especialista } from "./especialista";

export interface Horario {

    id : any;
    especialista : any;
    horariosEspecialidad : Array<HorarioEspecialidad>;
}
