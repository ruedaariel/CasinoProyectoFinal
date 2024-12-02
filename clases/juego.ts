import { JuegoCasino } from "../interfaz/juegoCasino";
import { Cliente } from "./Cliente";
import * as funciones from "../Funciones/funciones";
import * as rls from "readline-sync";

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

    // devuelve true si el jugador cumple condiciones de credito
    public verificarCredito(jugador:Cliente): boolean {

        if ((jugador.getACredito() < this.apuestaMinima)  || (jugador.getACredito() === 0)) { 
          
          funciones.mensajeAlerta(`El Cliente ${jugador.getNombre()} no dispone de saldo suficiente para apostar`,"rojo");
          funciones.mensajeAlerta(`Puede volver al Casino para recargar credito. Muchas Gracias.`,"azul");
          let pausa: string = rls.question((funciones.igualoCadena("", 31, " ") + "Presione una tecla ..."))
          
          return false;} 
          
        
          return true;
      }
}