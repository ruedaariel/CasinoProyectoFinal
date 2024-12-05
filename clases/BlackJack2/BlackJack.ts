//import * as funciones from "../../Funciones/funciones";
import "colors";
import { Cliente } from '../Cliente';
import {Carta} from './Carta';
import  * as readlineSync from 'readline-sync';
import { Juego } from "../juego";
import * as funciones from "../../Funciones/funciones";

export class BlackJack extends Juego {
  private baraja:Carta[]=[];
  private mano:Carta[]=[];
  private crupier:Carta[]=[];
  private apuestaActual:number=0;
  
constructor () {
   super();
   this.setNombre("BLACK JACK");
   this.setApuestaMinima(1000);
   this.setApuestaMaxima(10000);
   this.inicializarBaraja();   
}
//-----------------------------------------------------------------------------------------------------
 public getApuestaActual():number{
   return this.apuestaActual;
}
public setApuestaActual(apuestaActual: number): void {
   this.apuestaActual = apuestaActual ;
} 
//----------------------------------------------------------------------------------------------------------
/*public apostar(jugador:Cliente):void { 
  let premio:number=0; 
  this.apuestaActual = this.ingresarApuesta();
  if (this.apuestaActual >= jugador.getACredito()) {
         funciones.mensajeAlerta(`La apuesta debe serdir
           menor o igual a su credito de $ ${jugador.getACredito()}`, "Rojo")
  } else {
          jugador.setCredito(jugador.getACredito()-this.apuestaActual);
          //funciones.mensajeAlerta(`Tu crédito actual es de ${jugador.getACredito()}`,"Rojo");
          funciones.mensajeAlerta(`Apostando ${this.apuestaActual} pesos...`,"Azul"); 
          this.jugar();
          premio = this.pagar();
          jugador.setCredito(jugador.getACredito()+premio);
          funciones.mensajeAlerta(premio > 0 ? `¡Ganaste ${this.apuestaActual} pesos!` : `Lo siento, perdiste.`, premio > 0? "Rojo" : "Azul");
          funciones.mensajeAlerta(`Tu crédito actual es de ${jugador.getACredito()}`,"Rojo");
       }
  }*/
       public apostar(jugador: Cliente): void{ 
        let premio: number = 0; //Variable para asignar monto ganado en la jugada
        this.apuestaActual = funciones.validarValidezApuesta(`Realice su apuesta comprendida entre $ ${this.apuestaMinima} y $ ${this.apuestaMaxima} `, this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
        jugador.setCredito(jugador.getACredito()-this.apuestaActual);
        this.jugar();
        premio = this.pagar();
        jugador.setCredito(jugador.getACredito()+premio);
        funciones.mensajeAlerta(premio > 0 ? `¡GANASTE UN TOTAL DE ${premio} PESOS!` : `Lo siento, perdiste.`, premio > 0? "Amarillo" : "Azul");
        funciones.mensajeAlerta(`Tu crédito actual es de ${jugador.getACredito()} pesos`,"Rojo");
    }

//-------------------------------------------------------------------------------------------------------------- 
inicializarBaraja(){                       
      const palos=['❤️  CORAZONES',' 🔶  DIAMANTES',' ♣️ TRÉBOLES', '♠ PICAS'];
      const valores=['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      this.baraja=[];
      for (const palo of palos){
         for (const valor of valores){
              this.baraja.push(new Carta(valor,palo));
         }
      }}
//-------------------------------------------------------------------------------------------------------
barajar() {
    for (let i = this.baraja.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
          [this.baraja[i],this.baraja[j]] = [this.baraja[j], this.baraja[i]]       
    }
  } 
  //repartimos 2 cartas para jugador y 2 para crupier 
  repartir() {     
         this.mano=[this.baraja.pop() as Carta,this.baraja.pop() as Carta];
         this.crupier=[this.baraja.pop() as Carta,this.baraja.pop() as Carta];
    
  }
  public jugar():void {
    this.barajar();
    this.repartir();        
      // El jugador pedirá otra carta mientras la suma es menor a 17
       while (this.decisionDelJugador()) {
        if (this.baraja.length > 0) {
              this.mano.push(this.baraja.pop() as Carta); }
        else { 
               funciones.mensajeAlerta("Baraja vacía","Rojo"); 
              break;   }
        }    
        
    // El Crupier se dará otra carta mientras la suma es menor a 17
    while (this.decisionDelCrupier()) {
      if (this.baraja.length > 0) {
            this.crupier.push(this.baraja.pop() as Carta); }
      else { 
            funciones.mensajeAlerta("Baraja vacía","Rojo"); 
            break;   }
      }       
  }
  decisionDelJugador(): boolean {
    // Calcula el valor total de la mano del jugador
    const valorMano = this.calcularValorMano(this.mano);
      // Retorna verdadero si la suma es menor a 17
    if (valorMano < 17) {
      return true;
    } else {
      return false;
    }
  }
  decisionDelCrupier(): boolean {
    // Calcula el valor total de la mano del crupier
    const valorMano = this.calcularValorMano(this.crupier);
      // Retoorna verdadero si la suma es menor a 17
    if (valorMano < 17) {
      return true;
    } else {
      return false;
    }
  } 
  // acumula el valor de la mano deacuerdo al valor de la baraja
  calcularValorMano(ManoCrupier: Carta[]): number {
    let valor = 0;   
      for (const carta of ManoCrupier) {              
        if (carta.getValor() === 'A') {
           valor += 11;
          } else{ if (carta.getValor() ==='J' || carta.getValor() ==='Q' || carta.getValor() ==='K' ) {
                  valor += 10;
              } else {
                        valor += parseInt(carta.getValor());}                                                                  
                            }
    }     
  return valor;
  }
  //-----------------------------------------------------------------------------------------------------
  determinarGanador():boolean {     
    const valorMano = this.calcularValorMano(this.mano);
    const valorCrupier=this.calcularValorMano(this.crupier);
    funciones.mensajeAlerta("CARTAS DEL JUGADOR","Rojo");
    for (const carta of this.mano){
      console.log("                                               ",carta.getValor()," ",carta.getPalo()) ;            
    }     
    console.log("----------------------------------------------------------------------------------------------")
    funciones.mensajeAlerta("CARTAS DEL CRUPIER","Rojo");
    for (const carta of this.crupier){
        console.log("                                             ",carta.getValor()," ",carta.getPalo()) ;
        }  
     
   console.log("----------------------------------------------------------------------------------------------");
    if (valorMano > valorCrupier && valorMano <= 21) {          
             funciones.mensajeAlerta(`EL JUGADOR GANA`,"Rojo");
             return true
      }
      else {  funciones.mensajeAlerta("CRUPIER GANA","Rojo");
              return false}     
}
//------------------------------------------------------------------------------------------------------------
  public pagar(): number {          
    if (this.determinarGanador()) {
        return this.apuestaActual * 2
    }
    return 0
}  
//-------------------------------------------------------------------------------------------------------
public ingresarApuesta(): number {
  let montoApuesta: number = 0;
  let errorEntrada: boolean = true;

  do {
      console.clear();
      funciones.mensajeAlerta(`La apuesta puede variar entre ${this.apuestaMinima} y ${this.apuestaMaxima}`,"Amarillo");
      if (!errorEntrada) {
          funciones.mensajeAlerta(`Monto inválido. Debe ser un numero entre ${this.apuestaMinima} y ${this.apuestaMaxima}`,"Rojo");
      }
      montoApuesta = readlineSync.questionInt(funciones.igualoCadena("", 31, " ") + 'Ingrese la apuesta: '.green);
      if (!this.validarMontoApuesta(montoApuesta)) { 
          errorEntrada = false; 
      }

  } while (!this.validarMontoApuesta(montoApuesta));

  return montoApuesta;
}
//-------------------------------------------------------------------------------------------------
private validarMontoApuesta(valor: number): boolean {
  return !isNaN(valor) && valor == 0 || valor >= this.apuestaMinima && valor <= this.apuestaMaxima;  
}
}
