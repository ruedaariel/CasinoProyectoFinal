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
import { Juego } from "../juego";

export class Ruleta extends Juego implements JuegoCasino{
  
  private nrosRuleta: number[] = [];
  private colorRuleta: string[] = [];
  //private apuestaMinima: number = 100;
  //private apuestaMaxima: number = 1000;
  private apuestas: Apuesta[] = [];
  private bolilla: number = 0;
  private bolillaColor: string = ""
  private bolillaPar: string = ""
  private bolillaDocena: number = 0
  


  public constructor() {

    super();

    this.apuestaMaxima = 1000;
    this.apuestaMinima = 100;

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

  while (true){
  
    funciones.mensajeAlerta(`Bienvenido ${jugador.getNombre()} a la mesa de ruleta. Dispone de $${jugador.getACredito()}` + " para apostar","azul")
    funciones.mensajeAlerta(`Las apuestas permitidas son un minimo de $${this.apuestaMinima} y un maximo de $${this.apuestaMaxima} `,"amarillo");

        
    funciones.mensajeAlerta(" -- Presionando cualquier tecla va a jugar -- . -- Pulsando 0 -- vuelve al casino ","azul");
    let pausa: string = rls.question((funciones.igualoCadena("", 31, " ") + "Presione su opcion..."))

    if (pausa === "0" ) {return;}

    this.apuestas = [];  // asegur tener vacio el arreglo de apuestas


  // jugador habilitado voy a apostar
  this.apostar(JugadorRuleta);

  // tiramos bolilla y jugamos

  this.jugar();

  let paraAcreditar: number = this.pagar();

  // actualizo el crédito del cliente.
  JugadorRuleta.setCredito(jugador.getACredito() - paraAcreditar);

  //console.log(" ******* -> " + paraAcreditar + " <- ******* ");
  //funciones.stop();

  }

}

private verificarCredito(jugador:Cliente): boolean {

  if ((jugador.getACredito() < this.apuestaMinima)  || (jugador.getACredito() === 0)) { 
    
    funciones.mensajeAlerta(`El Cliente ${jugador.getNombre()} no dispone de saldo suficiente para apostar`,"rojo");
    funciones.mensajeAlerta(`Puede volver al Casino para recargar credito. Muchas Gracias.`,"azul");
    let pausa: string = rls.question((funciones.igualoCadena("", 31, " ") + "Presione una tecla ..."))
    
    return false;} 
    
  
    return true;
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

public  jugar (): void {

  this.bolilla = this.tirarBolilla(); // numero que salio al tirar la bolilla

}

public pagar(): number {

  let apostado:number = 0;
  let montoGanado: number = 0;

  console.clear();

  this.apuestas.forEach(apuesta => { 
    
    montoGanado += this.evaluarApuesta(apuesta,this.bolilla);
    apostado += apuesta.getCantidadApostada(); });


    funciones.mensajeAlerta(funciones.igualoCadena(` Bolilla: -${this.bolilla}-  Color: "${this.bolillaColor}"  Par: "${this.bolillaPar}" Docena: "${this.bolillaDocena}" `,46, " "), "verde");

    funciones.mensajeAlerta(funciones.igualoCadena("Lo apostado fue: ",46, " "),"azul");

    funciones.mostrarResultadoApuesta (this.apuestas,apostado,montoGanado)

    funciones.stop();


  //console.log(`Apostaste ${apostado} y ganaste ${montoGanado}`);

  return montoGanado

} 


  // evaluar apuesta recibe un objeto de tipo Apuesta y el numero que resulto de tira la bolilla
  // en funcion del tipo de apuesta evalua si hubo acierto o no
  // y ademas calcula el monto ganado en funcion de lo apostado

  
  private evaluarApuesta(apuesta: Apuesta, bolilla: number): number {

    //let numero = this.tirarBolilla(); // numero que salio al tirar la bolilla
    this.bolillaColor = this.colorRuleta[bolilla]; // color del nro que salio
    //let docena = 0; // docena donde se encuentra el nro

    let montoGanado = 0;

    if (bolilla / 12 - Math.trunc(bolilla / 12) === 0) {
      this.bolillaDocena = Math.trunc(bolilla / 12);
    } else {
      this.bolillaDocena = Math.floor(bolilla / 12) + 1;
    }

    this.bolillaPar = ""; // se almacena si par o impar el nro que salio

    if (bolilla % 2 === 0) {
      this.bolillaPar = "par";
    } else {
      this.bolillaPar = "impar";
    }

    // verifico si acerto con el nro apostado
    if (apuesta.getTipo().toLowerCase() === "numero" && bolilla === Number(apuesta.getValor())) {

      montoGanado += apuesta.getCantidadApostada() * 36;
      apuesta.setResultadoApuesta(montoGanado);
      //console.log(` Tu apuesta por el nro ${apuesta.getValor()} resulto ganadora`);
    }

    // verifico si acerto con el color apostado
    if (apuesta.getTipo().toLowerCase() === "color" && this.bolillaColor === apuesta.getValor()) {
      
      montoGanado += apuesta.getCantidadApostada() * 2;
      apuesta.setResultadoApuesta(montoGanado);
      //console.log(` Tu apuesta por el color ${apuesta.getValor()} resulto ganadora` );
    }

    // verifico si acerto con la docena
    if (apuesta.getTipo().toLowerCase() === "docena" && this.bolillaDocena === Number(apuesta.getValor())) {

      montoGanado += apuesta.getCantidadApostada() * 2;
      apuesta.setResultadoApuesta(montoGanado);
      //console.log(` Tu apuesta por la docena ${apuesta.getValor()} resulto ganadora`);
    }
    
    // verifico si acerto par o impar
    if (apuesta.getTipo().toLowerCase() === "paroimpar" && this.bolillaPar === apuesta.getValor()) {

      montoGanado += apuesta.getCantidadApostada() * 2;
      apuesta.setResultadoApuesta(montoGanado);
      //console.log(` Tu apuesta por par o impar ${apuesta.getValor()} resulto ganadora`);
    }
    //this.resultadoApuesta = montoGanado;
    return montoGanado; // retor el resultado de la apuesta

  }

  private mostrarApuesta (): void {
    
    let contador:number = 1;
    let separador: string = " a "
    let apuestaANro1:string = "Tu apuesta: |";
    let apuestaANro2:string = "| ";
    this.apuestas.forEach ( apuesta => {

      if (apuesta.getTipo() === "numero") { separador = " al ";contador++;}
      else {separador = " a ";contador++;}

      if (contador <= 6) { apuestaANro1 += `$${apuesta.getCantidadApostada()}` + separador+`${apuesta.getValor()} |`;}
      else {apuestaANro2 += `$${apuesta.getCantidadApostada()}` + separador+`${apuesta.getValor()} |`;}
      //apuestaANro += `$${apuesta.getCantidadApostada()}` + separador+`${apuesta.getValor()} |`;
          
    })

    if (contador <= 6 ) {funciones.mensajeAlertaSinMarco(apuestaANro1,"amarillo");}
    else {
      funciones.mensajeAlertaSinMarco(apuestaANro1,"amarillo");
      funciones.mensajeAlertaSinMarco(apuestaANro2,"amarillo");}
    
  
  
  }
  
  // apostar recibe todas las apuestas de un jugador sobre el tablero
  public apostar(jugador:Cliente): void {

    let opcion: string;
    let errorIngreso: boolean = true;
    let cartel: string = "";
    console.clear();
  
    const opcionesApuesta: string[] = ['1. Apuesta a Numero',
      '2. Apuesta a Color',
      '3. Apuesta a Par o Impar',
      '4. Apuesta a Docena',
      '0. Finalizar Apuesta'];
  
    do {

      this.preparaDatosTablero();

      if (this.apuestas.length != 0) {
        let cartel = this.mostrarApuesta();
        
        }
        
      
      if ( jugador.getACredito() === 0) { cartel = `${jugador.getNombre()} su saldo es $0. Finalice apuesta `.red }
      else { cartel = ` ${jugador.getNombre()} Tomamos su apuesta `}

     funciones.pantallaMenu(cartel, opcionesApuesta, 30, 40, 2);

      let CreditoParApostar: string = ` Dispone de $${ jugador.getACredito()} `;
  
  
      if (!errorIngreso) { funciones.lineaConRecuadroError(30, "Opción inválida. Por favor, reinteinte", 40, 2); }
    
      opcion = rls.question(funciones.igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green);
  
      switch (opcion) {
        case "1":
          
          let numero: number = funciones.validarNumeroEntre("Apueste por un nro entre 0 y 36",0,36,0);
          let apuestaN:number = funciones.validarNumeroEntre(`Realice su apuesta. ` + CreditoParApostar,this.apuestaMinima,this.apuestaMaxima,jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaN);
          this.apuestas.push(new Apuesta ("numero", numero.toString() , apuestaN));
          console.clear();
          
          break;
        case "2":
          
          let cadenaC = funciones.ingresarString(`Ingrese "rojo" o "negro"`,"rojo" ,"negro");
          let apuestaC:number = funciones.validarNumeroEntre(`Realice su apuesta. Dispone de $ ${jugador.getACredito() }`,this.apuestaMinima,this.apuestaMaxima,jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaC);
          this.apuestas.push(new Apuesta ("color", cadenaC , apuestaC));
          console.clear();
          
          break;
        case "3":
          let cadenaP = funciones.ingresarString(`Ingrese "par" o "impar"`,"par" ,"impar");
          let apuestaP:number = funciones.validarNumeroEntre(`Realice su apuesta. Dispone de $ ${jugador.getACredito() }`,this.apuestaMinima,this.apuestaMaxima,jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaP);
          this.apuestas.push(new Apuesta ("paroimpar", cadenaP , apuestaP));
          console.clear();
          
          break;
        case "4":
          let cadenaD = funciones.ingresarString(`Ingrese "primera" o "segunda" o "tercera" docena`,"primera" ,"segunda","tercera");
          let apuestaD:number = funciones.validarNumeroEntre(`Realice su apuesta. Dispone de $ ${jugador.getACredito() }`,this.apuestaMinima,this.apuestaMaxima,jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaD);
          this.apuestas.push(new Apuesta ("docena", cadenaD , apuestaD));
          console.clear();
          
          break;
        
        case "0":
          //salir
    
          break;
        default:
          errorIngreso = false;
          console.clear();
  
          break;
      }
    } while (opcion !== "0");
    //console.log(this.apuestas);
    //funciones.stop()
  }


  private preparaDatosTablero (): void {


    const arregloNumeros: number[] = [];
    const arregloExtras: string[] = [];

    this.apuestas.forEach ( apuesta => {

      if (apuesta.getTipo() === "numero") {arregloNumeros.push(parseInt(apuesta.getValor()));}
      else { arregloExtras.push(apuesta.getValor());}


    })
    //console.log(this.apuestas);
    //console.log("****" + arregloNumeros);
    //console.log(arregloExtras);
    //funciones.stop();

    funciones.dibujaTablero(arregloNumeros,arregloExtras);

  }

}