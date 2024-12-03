// Forma de pago de la ruleta
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
  private apuestas: Apuesta[] = [];
  private bolilla: number = 0;
  private bolillaColor: string = "";
  private bolillaPar: string = "";
  private bolillaDocena: number = 0;
  private bolillaDocenaString = "";



  public constructor() {

    super();

    this.apuestaMaxima = 1000;
    this.apuestaMinima = 100;
    this.nombre = "RULETA";
    

    this.nrosRuleta = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    ];

    this.colorRuleta = ["verde","rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo",
      "negro", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro",
      "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro",
      "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo",];
  }

  public comenzarAJugar(jugador: Cliente): void {

    let JugadorRuleta: Cliente = jugador;
    //let primeraVez = true;
    let mensajeBienvenida: string = ""
    this.apuestas = [];  // asegur tener vacio el arreglo de apuestas

    //if (!this.verificarCredito(jugador)) { return; } // retorno a casino

    //while (true) {

      //mensajeBienvenida = `Bienvenido ${jugador.getNombre()} a la mesa de ruleta.
      console.clear();

      //if (primeraVez) { mensajeBienvenida = `Bienvenido ${jugador.getNombre()} a la mesa de ruleta.` }
      //else { mensajeBienvenida = `${jugador.getNombre()} seguimos jugando? ` }

      funciones.mensajeAlerta(mensajeBienvenida+` Dispone de $${jugador.getACredito()}` + " para apostar", "azul")
      funciones.mensajeAlerta(`Las apuestas permitidas son un minimo de $${this.apuestaMinima} y un maximo de $${this.apuestaMaxima} `, "amarillo");


      //funciones.mensajeAlerta(" -- Presionando cualquier tecla va a jugar -- . -- Pulsando 0 -- vuelve al casino ", "azul");
      funciones.stop();

     


      // jugador habilitado voy a apostar
      this.apostar(JugadorRuleta);

      // tiramos bolilla y jugamos

      this.jugar();

      let paraAcreditar: number = this.pagar();
      
      // actualizo el crédito del cliente.
      JugadorRuleta.setCredito(jugador.getACredito() + paraAcreditar);

      //primeraVez = false // vuelvo a jugar

    //}

  }
  public tirarBolilla(): number {
    const numero = Math.floor(Math.random() * this.nrosRuleta.length);

    return numero;
    
  }

  public jugar(): void {

    this.bolilla = this.tirarBolilla(); // numero que salio al tirar la bolilla

  }

  public pagar(): number {

    let apostado: number = 0;
    let montoGanado: number = 0;

    console.clear();
    
    // si longitud es 0 no evaluo porque no se aposto nada
    if (this.apuestas.length === 0) {return 0;}

    
    
    this.apuestas.forEach(apuesta => {

      montoGanado += this.evaluarApuesta(apuesta, this.bolilla);
      apostado += apuesta.getCantidadApostada();
    });

    let resultadoBolilla: string = funciones.igualoCadena(" Bolilla: -> " + `${this.bolilla}` + " <-  -> " + `${this.bolillaColor}` + " <- -> " + `${this.bolillaPar}` + " <- -> " + `${this.bolillaDocenaString} <-`, 46, " ");
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

    if (bolilla / 12 - Math.trunc(bolilla / 12) === 0) {
      this.bolillaDocena = Math.trunc(bolilla / 12);
    } else {
      this.bolillaDocena = Math.floor(bolilla / 12) + 1;
    }

    if (this.bolillaDocena === 1) { this.bolillaDocenaString = "primera";}
    else { if (this.bolillaDocena === 2) {this.bolillaDocenaString = "segunda";}
            else {this.bolillaDocenaString = "tercera";}}

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
    if (apuesta.getTipo().toLowerCase() === "docena" && this.bolillaDocenaString === apuesta.getValor()) {

      montoGanado += apuesta.getCantidadApostada() * 2;
      apuesta.setResultadoApuesta(montoGanado);
      
    }

    // verifico si acerto par o impar
    if (apuesta.getTipo().toLowerCase() === "paroimpar" && this.bolillaPar === apuesta.getValor()) {

      montoGanado += apuesta.getCantidadApostada() * 2;
      apuesta.setResultadoApuesta(montoGanado);

    }

    return montoGanado; // retorno el resultado de la apuesta

  }

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

  // apostar recibe todas las apuestas de un jugador sobre el tablero
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

      // se verifica que el jugador tenga el saldo suficiente para realizar la apuesta minima
      if (jugador.getACredito() === 0 || jugador.getACredito() < this.apuestaMinima) { 
        
        funciones.mensajeAlerta(`${jugador.getNombre()} su saldo de $${jugador.getACredito()} es inferior al minimo para apostar. Finalice apuesta `,"rojo");}
        
      else { cartel = ` ${jugador.getNombre()} Tomamos su apuesta ` }

      // muestra el menu de apuestas
      funciones.pantallaMenu(cartel, opcionesApuesta, 30, 40, 2);

      let CreditoParApostar: string = ` Dispone de $${jugador.getACredito()} `;

      if (!errorIngreso) { funciones.lineaConRecuadroError(30, "Opción inválida. Por favor, reinteinte", 40, 2); }

      opcion = rls.question(funciones.igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green);

      switch (opcion) {
        case "1":

          let numero: number = funciones.validarNumeroEntre("Apueste por un nro entre 0 y 36", 0, 36);
          let apuestaN: number = funciones.validarValidezApuesta(`Realice su apuesta. ` + CreditoParApostar, this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaN);
          this.apuestas.push(new Apuesta("numero", numero.toString(), apuestaN));
          console.clear();

          break;
        case "2":

          let cadenaC = funciones.ingresarString(`Ingrese "rojo" o "negro"`, "rojo", "negro");
          let apuestaC: number = funciones.validarValidezApuesta(`Realice su apuesta. Dispone de $ ${jugador.getACredito()}`, this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaC);
          this.apuestas.push(new Apuesta("color", cadenaC, apuestaC));
          console.clear();

          break;
        case "3":
          let cadenaP = funciones.ingresarString(`Ingrese "par" o "impar"`, "par", "impar");
          let apuestaP: number = funciones.validarValidezApuesta(`Realice su apuesta. Dispone de $ ${jugador.getACredito()}`, this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaP);
          this.apuestas.push(new Apuesta("paroimpar", cadenaP, apuestaP));
          console.clear();

          break;
        case "4":
          let cadenaD = funciones.ingresarString(`Ingrese "primera" o "segunda" o "tercera" docena`, "primera", "segunda", "tercera");
          let apuestaD: number = funciones.validarValidezApuesta(`Realice su apuesta. Dispone de $ ${jugador.getACredito()}`, this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
          jugador.setCredito(jugador.getACredito() - apuestaD);
          this.apuestas.push(new Apuesta("docena", cadenaD, apuestaD));
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

  }


  private preparaDatosTablero(): void {


    const arregloNumeros: number[] = [];
    const arregloExtras: string[] = [];

    this.apuestas.forEach(apuesta => {

      if (apuesta.getTipo() === "numero") { arregloNumeros.push(parseInt(apuesta.getValor())); }
      else { arregloExtras.push(apuesta.getValor()); }


    })

    funciones.dibujaTablero(arregloNumeros, arregloExtras);

  }

}