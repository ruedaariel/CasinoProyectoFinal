import { Jugador, Carta, Juego } from './interfaces';

export class JugadorImpl implements Jugador {
    nombre: string;
    mano: Carta[] = [];
    saldo: number; 
    apuestaActual: number = 0;
  
    constructor(nombre: string,saldo: number) {
         this.nombre = nombre;
         this.saldo = saldo;
    }    
  
apostar(cantidad: number) { 
    if (cantidad > this.saldo) {
         console.log(`${this.nombre} no tiene suficiente saldo para apostar ${cantidad}.`); }
    else { this.saldo -= cantidad;
           this.apuestaActual += cantidad; 
           console.log(`${this.nombre} ha apostado ${cantidad}. Saldo restante: ${this.saldo}.`); 
        }
     }    
    ganar(cantidad: number) {
         this.saldo += cantidad; 
         console.log(`${this.nombre} ha ganado ${cantidad}. Saldo total: ${this.saldo}.`);
         }
  }
  