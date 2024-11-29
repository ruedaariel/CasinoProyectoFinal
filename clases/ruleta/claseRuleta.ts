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

export class Ruleta extends Juego implements JuegoCasino {

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

    this.colorRuleta = ["rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo",
      "negro", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro",
      "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro",
      "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo",];
  }

  public comenzarAJugar(jugador: Cliente): void {

    let JugadorRuleta: Cliente = jugador;
    let primeraVez: boolean = true;
    let mensajeBienvenida: string = "";

    if (!this.verificarCredito(jugador)) { return; } // retorno a casino

    while (true) {

      if (primeraVez) { mensajeBienvenida = `Bienvenido ${jugador.getNombre()} a la mesa de ruleta. ` }
      else { mensajeBienvenida = `Sigues jugando ${jugador.getNombre()}? `; }

      funciones.mensajeAlerta(mensajeBienvenida + `Dispones de $${jugador.getACredito()}` + " para apostar", "azul")
      funciones.mensajeAlerta(`Las apuestas permitidas son un minimo de $${this.apuestaMinima} y un maximo de $${this.apuestaMaxima} `, "amarillo");


      funciones.mensajeAlerta(" -- Presionando cualquier tecla va a jugar -- . -- Pulsando 0 -- vuelve al casino ", "azul");
      let pausa: string = rls.question((funciones.igualoCadena("", 31, " ") + "Presione su opcion..."))

      if (pausa === "0") { return; }

      this.apuestas = [];  // asegur tener vacio el arreglo de apuestas


      // jugador habilitado voy a apostar
      this.apostar(JugadorRuleta);

      // tiramos bolilla y jugamos
      this.jugar();

      let paraAcreditar: number = this.pagar(); // resultado de la apuesta

      // actualizo el crédito del cliente.
      JugadorRuleta.setCredito(jugador.getACredito() - paraAcreditar);

      primeraVez = false; // cambia el mensaje para volver a jugar
      console.clear();

    }

  }

  // verfica el crédito del cliente antes de ir a jugar
  private verificarCredito(jugador: Cliente): boolean {

    if ((jugador.getACredito() < this.apuestaMinima) || (jugador.getACredito() === 0)) {

      funciones.mensajeAlerta(`El Cliente ${jugador.getNombre()} no dispone de saldo suficiente para apostar`, "rojo");
      funciones.mensajeAlerta(`Puede volver al Casino para recargar credito. Muchas Gracias.`, "azul");
      let pausa: string = rls.question((funciones.igualoCadena("", 31, " ") + "Presione una tecla ..."))

      return false;
    }
    return true;
  }

  // simula el tirar la bolilla
  public tirarBolilla(): number {
    const numero = Math.floor(Math.random() * this.nrosRuleta.length);

    return numero;
    
  }
  
  public jugar(): void {

    this.bolilla = this.tirarBolilla(); // numero que salio al tirar la bolilla

  }

  // evalua el arrglo de las apuesta hecho y lo muestra en pantalla
  public pagar(): number {

    let apostado: number = 0;
    let montoGanado: number = 0;

    console.clear();

    this.apuestas.forEach(apuesta => {

      montoGanado += this.evaluarApuesta(apuesta, this.bolilla);
      apostado += apuesta.getCantidadApostada();
    });

    let resultadoBolilla: string = funciones.igualoCadena(" Bolilla: -> " + `${this.bolilla}` + " <-  -> " + `${this.bolillaColor}` + " <- -> " + `${this.bolillaPar}` + " <- -> " + `${this.bolillaDocena} <-`, 46, " ");
    funciones.mensajeAlerta(resultadoBolilla, "amarillo");

    funciones.mensajeAlerta(funciones.igualoCadena("Lo apostado fue: ", 46, " "), "azul");

    funciones.mostrarResultadoApuesta(this.apuestas, apostado, montoGanado)

    funciones.stop();

    return montoGanado

  }


  // evaluar apuesta recibe un objeto de tipo Apuesta y el numero que resulto de tira la bolilla
  // en funcion del tipo de apuesta evalua si hubo acierto o no
  // y ademas calcula el monto ganado en funcion de lo apostado


  private evaluarApuesta(apuesta: Apuesta, bolilla: number): number {

    
    this.bolillaColor = this.colorRuleta[bolilla]; // color del nro que salio
    
    let montoGanado = 0;

    // calcula la docena de la bolilla
    if (bolilla / 12 - Math.trunc(bolilla / 12) === 0) {
      this.bolillaDocena = Math.trunc(bolilla / 12);
    } else {
      this.bolillaDocena = Math.floor(bolilla / 12) + 1;
    }

    // determina si bolilla es par o impar
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

      // si bolilla es 0 retorno lo que gano en nro, el resto se anula
      if (bolilla === 0) {

        this.bolillaColor = " ";
        this.bolillaPar = " ";
        this.bolillaDocena = 0;
        return montoGanado;
      }
      
    }

    // verifico si acerto con el color apostado
    if (apuesta.getTipo().toLowerCase() === "color" && this.bolillaColor === apuesta.getValor()) {

      montoGanado += apuesta.getCantidadApostada() * 2;
      apuesta.setResultadoApuesta(montoGanado);
      
    }

    // verifico si acerto con la docena
    if (apuesta.getTipo().toLowerCase() === "docena" && this.bolillaDocena === Number(apuesta.getValor())) {

      montoGanado += apuesta.getCantidadApostada() * 2;
      apuesta.setResultadoApuesta(montoGanado);
      
    }

    // verifico si acerto par o impar
    if (apuesta.getTipo().toLowerCase() === "paroimpar" && this.bolillaPar === apuesta.getValor()) {

      montoGanado += apuesta.getCantidadApostada() * 2;
      apuesta.setResultadoApuesta(montoGanado);
      
    }
    
    return montoGanado; // retor el resultado de la apuesta

  }

  // a medida que el apostador va haciendo apuestas las va mostrando
  private mostrarApuesta(): void {

    let contador: number = 1;
    let separador: string = " a "
    let apuestaANro1: string = "Tu apuesta: |";
    let apuestaANro2: string = "| ";
    this.apuestas.forEach(apuesta => {

      if (apuesta.getTipo() === "numero") { separador = " al "; contador++; }
      else { separador = " a "; contador++; }

      if (contador <= 6) { apuestaANro1 += `$${apuesta.getCantidadApostada()}` + separador + `${apuesta.getValor()} |`; }
      else { apuestaANro2 += `$${apuesta.getCantidadApostada()}` + separador + `${apuesta.getValor()} |`; }
     
    })

    if (contador <= 6) { funciones.mensajeAlertaSinMarco(apuestaANro1, "amarillo"); }
    else {
      funciones.mensajeAlertaSinMarco(apuestaANro1, "amarillo");
      funciones.mensajeAlertaSinMarco(apuestaANro2, "amarillo");
    }



  }

  // apostar con un menu realiza las apuestas y las almacena en un arreglo del tipo apuesta
  public apostar(jugador: Cliente): void {

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

      if (jugador.getACredito() === 0) { cartel = `${jugador.getNombre()} su saldo es $0. Finalice apuesta `.red }
      else { cartel = ` ${jugador.getNombre()} Tomamos su apuesta ` }

      funciones.pantallaMenu(cartel, opcionesApuesta, 30, 40, 2);

      let CreditoParApostar: string = ` Dispone de $${jugador.getACredito()} `;


      if (!errorIngreso) { funciones.lineaConRecuadroError(30, "Opción inválida. Por favor, reinteinte", 40, 2); }

      opcion = rls.question(funciones.igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green);

      switch (opcion) {
        case "1":
          // ingresa la apuesta a numero
          let numero: number = funciones.validarNumeroEntre("Apueste por un nro entre 0 y 36", 0, 36, 0);
          let apuestaN: number = funciones.validarNumeroEntre(`Realice su apuesta. ` + CreditoParApostar, this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaN);
          this.apuestas.push(new Apuesta("numero", numero.toString(), apuestaN));
          console.clear();

          break;
        case "2":
          // ingresa la apuesta a color
          let cadenaC = funciones.ingresarString(`Ingrese "rojo" o "negro"`, "rojo", "negro");
          let apuestaC: number = funciones.validarNumeroEntre(`Realice su apuesta. Dispone de $ ${jugador.getACredito()}`, this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaC);
          this.apuestas.push(new Apuesta("color", cadenaC, apuestaC));
          console.clear();

          break;
        case "3":
          // ingresa la apuesta a par o impar
          let cadenaP = funciones.ingresarString(`Ingrese "par" o "impar"`, "par", "impar");
          let apuestaP: number = funciones.validarNumeroEntre(`Realice su apuesta. Dispone de $ ${jugador.getACredito()}`, this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaP);
          this.apuestas.push(new Apuesta("paroimpar", cadenaP, apuestaP));
          console.clear();

          break;
        case "4":
          // ingresa la apuesta a docena
          let cadenaD = funciones.ingresarString(`Ingrese "primera" o "segunda" o "tercera" docena`, "primera", "segunda", "tercera");
          let apuestaD: number = funciones.validarNumeroEntre(`Realice su apuesta. Dispone de $ ${jugador.getACredito()}`, this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaD);
          this.apuestas.push(new Apuesta("docena", cadenaD, apuestaD));
          console.clear();

          break;

        case "0": // sale de realizar apuesta
          break;
        default:
          errorIngreso = false; // si se ingreso un valor que no esta en menu
          console.clear();

          break;
      }
    } while (opcion !== "0");
    
  }

  // tomando el arreglo de apuestas arma dos areglos para simular un tablero en pantalla
  private preparaDatosTablero(): void {


    const arregloNumeros: number[] = [];
    const arregloExtras: string[] = [];

    this.apuestas.forEach(apuesta => {

      if (apuesta.getTipo() === "numero") { arregloNumeros.push(parseInt(apuesta.getValor())); }
      else { arregloExtras.push(apuesta.getValor()); }


    })
    // arma el tablero en pantalla
    funciones.dibujaTablero(arregloNumeros, arregloExtras);

  }

}