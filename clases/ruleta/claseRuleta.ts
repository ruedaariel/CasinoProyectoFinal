// Tipo de apuesta que un jugador puede realizar
//interface ApuestaRuleta {
//    tipo: "numero" | "color" | "parOImpar";
//    valor: any; // El valor depende del tipo de apuesta number, string, string
//    cantidadApostada: number; // Cantidad apostada
//  } 
    
    
    // Columnas y docenas	12 números	monto apostado x 2
    // par o impar  monto apostado x 2
    // Pleno	1 número	monto apostado x 36	

import { JuegoCasino } from "../../interfaz/juegoCasino";
import { Apuesta } from "./Apuesta";
import { Cliente } from "../Cliente" 
import * as funciones from "../../Funciones/funciones"
import "colors";
import * as rls from "readline-sync";

export class Ruleta implements JuegoCasino{
  
  private nrosRuleta: number[] = [];
  private colorRuleta: string[] = [];
  private APUESTA_MINIMA: number = 100;
  private APUESTA_MAXIMA: number = 1000;
  private apuestas: Apuesta[] = [];


  public constructor() {
    this.nrosRuleta = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];

    this.colorRuleta = [ "rojo","negro","rojo","negro","rojo","negro","rojo","negro","rojo",
                         "negro","negro","rojo","negro","rojo","negro","rojo","negro","rojo","negro",
                         "rojo","negro","rojo","negro","rojo","negro","rojo","negro","rojo","negro",
                         "rojo","negro","rojo","negro","rojo","negro","rojo",];
  }

public comenzarAJugar(jugador:Cliente): void {

  let JugadorRuleta:Cliente = jugador;

  if (!this.verificarCredito(jugador)) { return;} // retorno a casino

  // jugador habilitado voy a apostar
  this.apostar(JugadorRuleta);

  

  


}

private verificarCredito(jugador:Cliente): boolean {

  if ((jugador.getACredito() < this.APUESTA_MINIMA)  || (jugador.getACredito() === 0)) { 
    
    funciones.mensajeAlerta(`El Cliente ${jugador.getNombre()} no dispone de saldo suficiente para apostar`,"rojo");
    return false;} 
  
    return true;
}

// public apostar(jugador:Cliente): void {

// console.clear();

// }

public jugar(): void{

console.clear();

}

public pagar(): number {

  return 4;
}




  public tirarBolilla(): number {
    const numero = Math.floor(Math.random() * this.nrosRuleta.length);

    return numero;
  }

  // funcion calcular ganancia recibe un arreglo de apuestas armado en el casino
  // tira la bollilla
  // recorre el arreglo y llama a la funcion evaluarapuesta por cada elemento del arreglo
  // retorna el monto ganado en cada apuesta
  // lo acumula y devuelve el monto total.

public calcularGanacia (apuesta: Apuesta []): void {

  let numero = this.tirarBolilla(); // numero que salio al tirar la bolilla

  let montoGanado: number = 0;
  let montoApostado: number = 0;

  apuesta.forEach(apuesta => { montoGanado += this.evaluarApuesta(apuesta,numero);
                               montoApostado += apuesta.getCantidadApostada();});

  console.log(`Apostaste ${montoApostado} y ganaste ${montoGanado}`);

} 


  // evaluarapuesta recibe un objeto de tipo Apuesta y el nuero que resulto de tira la bolilla
  // en funcion del tipo de apuesta evalua si hubo acierto o no
  // y ademas calcula el monto ganado en funcion de lo apostado

  private evaluarApuesta(apuesta: Apuesta, bolilla: number): number {

    let numero = this.tirarBolilla(); // numero que salio al tirar la bolilla
    let color = this.colorRuleta[numero]; // color del nro que salio
    let docena = 0; // docena donde se encuentra el nro

    let montoGanado = 0;

    if (numero / 12 - Math.trunc(numero / 12) === 0) {
      docena = Math.trunc(numero / 12);
    } else {
      docena = Math.floor(numero / 12) + 1;
    }

    let parOImpar = ""; // se almacena si par o impar el nro que salio

    if (numero % 2 === 0) {
      parOImpar = "par";
    } else {
      parOImpar = "impar";
    }

    //console.log(` numero par: ${parOImpar} ------`);
    //console.log(` apuesta par: ${apuesta.getValor()} ------`);

    //console.log(numero);
    //console.log(color);
    //console.log(docena);
    //console.log(parOImpar);

    // verifico si acerto con el nro apostado
    if (apuesta.getTipo().toLowerCase() === "numero" && numero === Number(apuesta.getValor())) {

      montoGanado += apuesta.getCantidadApostada() * 36;
      console.log(` Tu apuesta por el nro ${apuesta.getValor()} resulto ganadora`);
    }

    // verifico si acerto con el color apostado
    if (apuesta.getTipo().toLowerCase() === "color" && color === apuesta.getValor()) {
      
      montoGanado += apuesta.getCantidadApostada() * 2;
      console.log(` Tu apuesta por el color ${apuesta.getValor()} resulto ganadora` );
    }

    // verifico si acerto con la docena
    if (apuesta.getTipo().toLowerCase() === "docena" && docena === Number(apuesta.getValor())) {

      montoGanado += apuesta.getCantidadApostada() * 2;
      console.log(` Tu apuesta por la docena ${apuesta.getValor()} resulto ganadora`);
    }
    
    // verifico si acerto par o impar
    if (apuesta.getTipo().toLowerCase() === "paroimpar" && parOImpar === apuesta.getValor()) {

      montoGanado += apuesta.getCantidadApostada() * 2;
      console.log(` Tu apuesta por par o impar ${apuesta.getValor()} resulto ganadora`);
    }
    return montoGanado; // retor el resultado de la apuesta

  }

  public apostar(jugador:Cliente): void {

    let opcion: string;
    let errorIngreso: boolean = true;
    console.clear();
  
    const opcionesApuesta: string[] = ['1. Apuesta a Numero',
      '2. Apuesta a Color',
      '3. Apuesta a Par o Impar',
      '4. Apuesta a Docena',
      '0. Salir'];
  
    do {
  
      funciones.pantallaMenu( ` ${jugador.getNombre()} Tomamos su apuesta `, opcionesApuesta, 30, 40, 2);
  
  
      if (!errorIngreso) { funciones.lineaConRecuadroError(30, "Opción inválida. Por favor, reinteinte", 40, 2); }
  
  
  
      opcion = rls.question(funciones.igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green);
  
      switch (opcion) {
        case "1":
          
          let numero: number = funciones.validarNumeroEntre("Apueste por un nro entre 0 y 36",0,36,0);
          let apuestaN:number = funciones.validarNumeroEntre("apuesta",this.APUESTA_MINIMA,this.APUESTA_MAXIMA,jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaN);
          console.log("***** " + jugador.getACredito());
          funciones.stop();
          this.apuestas.push(new Apuesta ("numero", numero.toString() , apuestaN));
          
          break;
        case "2":
          console.log("seleccionaste Opcion 2");
          
          break;
        case "3":
          console.log("seleccionaste Opcion 3");
          
          break;
        case "4":
          console.log("seleccionaste Opcion 4");
          
          break;
        case "5":
          console.log("seleccionaste Opcion 5");
        case "0":
          //salir
    
          break;
        default:
          errorIngreso = false;
          console.clear();
  
          break;
      }
    } while (opcion !== "0");
    console.log(this.apuestas);
  }
 
  



}



