import { JuegoCasino } from "../interfaz/juegoCasino";
import { Cliente } from "./Cliente";

export abstract class Juego implements JuegoCasino{
    protected nombre : string = "";
    protected apuestaMinima: number = 0;
    protected apuestaMaxima: number = 100000;

    public abstract apostar(jugador: Cliente): void 

    public abstract pagar():number;

    public abstract jugar():void;

    public getNombre():string {
        return this.nombre;
    }
    public setNombre(value: string) {
        if (value != undefined && value.trim() != "") {
            this.nombre = value.trim();
        }
    }
    public getApuestaMinima(): number {
        return this.apuestaMinima;
    }
    public  setApuestaMinima(value: number) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }
    }

    public getApuestaMaxima(): number {
        return this.apuestaMinima;
    }
    public  setApuestaMaxima(value: number) {
        if (value != undefined && value > 0) {
            this.apuestaMaxima = value;
        }

    }
}