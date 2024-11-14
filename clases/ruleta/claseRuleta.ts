// Tipo de apuesta que un jugador puede realizar
//interface ApuestaRuleta {
//    tipo: "numero" | "color" | "parOImpar";
//    valor: any; // El valor depende del tipo de apuesta number, string, string
//    cantidadApostada: number; // Cantidad apostada
//  } 
    
    
    // Columnas y docenas	12 números	monto apostado x 2
    // par o impar  monto apostado x 2
    // Pleno	1 número	monto apostado x 36	

import { ApuestaRuleta } from "./Apuesta";

export class Ruleta {
  private nrosRuleta: number[] = [];
  private colorRuleta: string[] = [];

  public constructor() {
    this.nrosRuleta = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];

    this.colorRuleta = [
      "verde",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
      "negro",
      "rojo",
    ];
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

public calcularGanacia (apuesta: ApuestaRuleta []): void {

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

  private evaluarApuesta(apuesta: ApuestaRuleta, bolilla: number): number {

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

  
}



