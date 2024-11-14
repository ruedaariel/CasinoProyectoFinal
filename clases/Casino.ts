import { Juego2 } from "./juego2/juego2";
import { Juego3} from "./juego3/juego3";
import { TragamonedasClasico } from "./tragamonedas/TragamonedasClasico";
import { TragamonedasTematico } from "./tragamonedas/TragamonedasTematico";
import {Cliente} from "./Cliente";

export class Casino {
    clientes:Cliente[] =[];
    tragamonedasClasico: TragamonedasClasico;
    tragamonedasTematico: TragamonedasTematico;
    juego2 : Juego2;
    juego3 : Juego3;
    constructor() {
        
           this.tragamonedasClasico = new TragamonedasClasico();
           this.tragamonedasTematico =  new TragamonedasTematico();
           this.juego2 =  new Juego2();
           this.juego3 = new Juego3();
    }

    /*elegirJuego(nombre: string): Juego | null {
        return this.juegos.find(juego => juego.obtenerNombre() === nombre) || null;
    }*/

    listarJuegos():string[]{
        let salida: string[]= [];
        
        salida[0] = `${this.tragamonedasClasico.getNombre()}     Monto mínimo de apuesta:${this.tragamonedasClasico.getApuestaMinima()}`;  
        salida[1] = `/n ${this.tragamonedasTematico.getNombre()}     Monto mínimo de apuesta:${this.tragamonedasTematico.getApuestaMinima()}`;
        salida[2] = `/n ${this.juego2.getNombre()}     Monto mínimo de apuesta:${this.juego2.getApuestaMinima()}`;
        salida[3] = `/n ${this.juego3.getNombre()}     Monto mínimo de apuesta:${this.juego3.getApuestaMinima()}`;
        return salida;
      
    }
}
