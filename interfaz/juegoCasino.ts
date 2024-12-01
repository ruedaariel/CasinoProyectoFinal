import { Cliente } from "../clases/Cliente";

export interface JuegoCasino {
    apostar(jugador:Cliente):void;
    jugar():void;
    pagar():number;
    
}