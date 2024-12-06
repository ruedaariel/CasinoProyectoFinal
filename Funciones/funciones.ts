import "colors";
import { error } from "console";
import * as rls from "readline-sync";
import { Apuesta } from "../clases/ruleta/Apuesta";

// resuelve la logica de la seleccion de opciones conm manejo del error
// servicio => es un arreglo que define las opciones y su texto y sirve para pasarlo a
// pantalla menu para dibujarlo 

export function menuGenerico() {

  let opcion: string;
  let errorIngreso: boolean = true;
  console.clear();

  const servicios: string[] = ['1. Opcion 1',
    '2. Opcion 2',
    '3. Opcion 3',
    '4. Opcion 4',
    '5. Opcion 5',
    '0. Salir'];

  do {

    pantallaMenu(" Titulo general", servicios, 30, 40, 2);

    if (!errorIngreso) {
      lineaConRecuadroError(30, "Opción inválida. Por favor, reinteinte", 40, 2);
      errorIngreso = true;
    }

    opcion = rls.question(igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green);

    switch (opcion) {
      case "1":

        console.log("seleccionaste Opcion 1");

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
}

// se invoca de esta forma => pantallaMenu(" Casino ", servicios, 30, 40, 2);
// " Casino " => es el titulo del menu
// 30 => 30 lugares desde el margen izquierdo
// 40 es el ancho del recuadro
// 2 => es el set de caracteres --- 1 => linea simple (|) o 2 => linea doble (║) 

export function pantallaMenu(titulo: string, opciones: string[], padIzquierdo: number, ancho: number, set: number) {

  // armo un cuadro con el menu de opciones
  lineaConRecuadro(padIzquierdo, titulo, ancho, set);
  cierreSuperior(padIzquierdo, ancho, set)
  opciones.forEach(element => { armaLinea(padIzquierdo, element, ancho, set) });
  cierreInferior(padIzquierdo, ancho, set);

}

// arma linea superior de cuadro
export function cierreSuperior(padIzquierdo: number, ancho: number, set: number) {

  // SET = 1 caracteres  de recueadro con linea simple
  // SET = 2 caracteres  de recueadro con linea doble

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "┌" + igualoCadena("─", ancho, "─") + "┐");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "╔" + igualoCadena("═", ancho, "═") + "╗");
  }
}

// arma linea inferior de cuadro
export function linea(padIzquierdo: number, ancho: number, set: number) {

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "" + igualoCadena("─", ancho, "─") + "");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "" + igualoCadena("═", ancho, "═") + "");
  }
}

// arma linea inferior de cuadro
export function cierreInferior(padIzquierdo: number, ancho: number, set: number) {

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "└" + igualoCadena("─", ancho, "─") + "┘");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "╚" + igualoCadena("═", ancho, "═") + "╝");
  }
}

// arma las lineas interna de un cuadro
export function armaLinea(padIzquierdo: number, texto: string, ancho: number, set: number) {

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "│ " + igualoCadena(texto, ancho - 1, " ").green + "│");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "║ " + igualoCadena(texto, ancho - 1, " ").green + "║");
  }

}

// genera un texto enmarcado    PadIzquierdo = separacion del margen izquierdo
//                              texto = lo que se quiere mostrar
//                              ancho = cuantocaracteres de ancho debe tener
//                              set = 1 => linea simple | o 2 => linea doble ║                     
export function lineaConRecuadro(padIzquierdo: number, texto: string, ancho: number, set: number) {


  cierreSuperior(padIzquierdo, ancho, set);
  armaLinea(padIzquierdo, texto, ancho, set);
  cierreInferior(padIzquierdo, ancho, set);

}

// arma las lineas interna de un cuadro
export function armaLineaError(padIzquierdo: number, texto: string, ancho: number, set: number) {

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "│ " + igualoCadena(texto, ancho - 1, " ").red + "│");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "║ " + igualoCadena(texto, ancho - 1, " ").red + "║");
  }

}

// genera una linea enmarcada
export function lineaConRecuadroError(padIzquierdo: number, texto: string, ancho: number, set: number) {

  cierreSuperior(padIzquierdo, ancho, set);
  armaLineaError(padIzquierdo, texto, ancho, set);
  cierreInferior(padIzquierdo, ancho, set);

}

export function separador(padIzquierdo: number, ancho: number, set: number) {


  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "├" + igualoCadena("─", ancho, "─") + "┤");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "╠" + igualoCadena("═", ancho, "═") + "╣");
  }

}

//---------------   mensaje alerta ----------------

// genera un texto enmarcado ajustandolo al ancho del mismo
// color => pude cambiar el color a "rojo" "verde" "azul" "amarillo"
// el mensaje se centra en el lugar 50 de la linea

export function mensajeAlerta(mensaje: string, color: string): void {

  let ancho = mensaje.length;
  let set: number = 2;
  let padIzquierdo: number = 20;

  if (ancho % 2 != 0) { ancho += 1; mensaje = mensaje + " "; }
  else { padIzquierdo = 50 - ancho / 2; }

  //mensaje = igualoCadena(mensaje,ancho,"").green;

  if (color.toLocaleLowerCase().trim() === "rojo") { mensaje = igualoCadena(mensaje, ancho, "").red; }
  if (color.toLocaleLowerCase().trim() === "verde") { mensaje = igualoCadena(mensaje, ancho, "").green; }
  if (color.toLocaleLowerCase().trim() === "azul") { mensaje = igualoCadena(mensaje, ancho, "").blue; }
  if (color.toLocaleLowerCase().trim() === "amarillo") { mensaje = igualoCadena(mensaje, ancho, "").yellow; }

  padIzquierdo = 50 - ancho / 2;

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "┌" + igualoCadena("─", ancho + 2, "─") + "┐");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "╔" + igualoCadena("═", ancho + 2, "═") + "╗");
  }

  // armos linea de mensaje
  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "│ " + mensaje + " │");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "║ " + mensaje + " ║");
  }

  // arma linea inferior de cuadro

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "└" + igualoCadena("─", ancho + 2, "─") + "┘");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "╚" + igualoCadena("═", ancho + 2, "═") + "╝");
  }

}

// justifica ancho de cualquier linea a un valor deseado
export function igualoCadena(cadena: string, largo: number, caracter: string): string {

  let cadenaNormalizada = cadena.padEnd(largo, caracter);

  return cadenaNormalizada;

}

// -------------------------------------------
// funciones para armar los dados en la consola
export function dibujaUnDado(dado1: number, dado2: number): void {

  const todosLosDados: string[][] = [["╔════╦════╦════╗",
    "║    ║    ║    ║",
    "╠════╬════╬════╣",
    "║    ║ ██ ║    ║",
    "╠════╬════╬════╣",
    "║    ║    ║    ║",
    "╚════╩════╩════╝"],
  ["╔════╦════╦════╗",
    "║ ██ ║    ║    ║",
    "╠════╬════╬════╣",
    "║    ║    ║    ║",
    "╠════╬════╬════╣",
    "║    ║    ║ ██ ║",
    "╚════╩════╩════╝"],
  ["╔════╦════╦════╗",
    "║ ██ ║    ║    ║",
    "╠════╬════╬════╣",
    "║    ║ ██ ║    ║",
    "╠════╬════╬════╣",
    "║    ║    ║ ██ ║",
    "╚════╩════╩════╝"],
  ["╔════╦════╦════╗",
    "║ ██ ║    ║ ██ ║",
    "╠════╬════╬════╣",
    "║    ║    ║    ║",
    "╠════╬════╬════╣",
    "║ ██ ║    ║ ██ ║",
    "╚════╩════╩════╝"],
  ["╔════╦════╦════╗",
    "║ ██ ║    ║ ██ ║",
    "╠════╬════╬════╣",
    "║    ║ ██ ║    ║",
    "╠════╬════╬════╣",
    "║ ██ ║    ║ ██ ║",
    "╚════╩════╩════╝"],
  ["╔════╦════╦════╗",
    "║ ██ ║    ║ ██ ║",
    "╠════╬════╬════╣",
    "║ ██ ║    ║ ██ ║",
    "╠════╬════╬════╣",
    "║ ██ ║    ║ ██ ║",
    "╚════╩════╩════╝"]]



  const bordeSuperior1: string = "┌────┬────┬────┐";
  const primeraLinea1: string = "│ ██ │ ██ │ ██ │";
  const lineaInternedia1: string = "├────┼────┼────┤";
  const segundaLInea1: string = "│ ██ │ ██ │ ██ │";
  const teceraLinea1: string = "│ ██ │ ██ │ ██ │";
  const ultimaLinea1: string = "└────┴────┴────┘";

  console.log("\n");

  const todosLosDadosAux: string[][] = [...todosLosDados];
  const dadoUno: string[] = [...todosLosDadosAux[dado1 - 1]];
  const dadoDos: string[] = [...todosLosDadosAux[dado2 - 1]];

  for (let i = 0; i < dadoUno.length; i++) {
    console.log("                               " + dadoUno[i] + "    " + dadoDos[i]);
  }
}

// valida la entrada de dos numeros
export function validarNumeroEntre(cartel: string, min: number, max: number): number {
  let numero: number;
  let numeroString: string = "0";
  let errorEntrada: boolean = true;

  do {
    console.clear();

    mensajeAlerta(cartel, "azul");
    // para evitar el scroll indefinido usamos una variable bool 
    if (!errorEntrada) {

      mensajeAlerta("Ingreso invalido... reintente por favor", "rojo");
      errorEntrada = true;
    }
    // ingresa el nro
    numeroString = rls.question(igualoCadena("", 31, " ") + "Ingrese el valor: ".green);
    numero = parseInt(numeroString);

    if (isNaN(numero)) {
      errorEntrada = false
    } else {
      if ((numero >= min) && (numero <= max)) { errorEntrada = true }
      else { errorEntrada = false }
    }
    //console.clear();

  } while (!errorEntrada)

  return numero
}

// valida la apuesta
export function validarValidezApuesta(cartel: string, apumin: number, apumax: number, saldo: number): number {
  let apuestaHecha: number;
  let apuestaString: string = "0";
  let errorEntrada: boolean = true;


  do {
    console.clear();

    mensajeAlerta(cartel, "azul");
    // para evitar el scroll indefinido usamos una variable bool 
    if (!errorEntrada) {

      mensajeAlerta("Ingreso invalido... reintente por favor", "rojo");
      errorEntrada = true;
    }
    // ingresa el nro
    apuestaString = rls.question(igualoCadena("", 31, " ") + "Ingrese el valor: ".green);
    apuestaHecha = parseInt(apuestaString);

    if (isNaN(apuestaHecha)) {
      errorEntrada = false
    } else {


      if ((apuestaHecha > apumax) || (apuestaHecha < apumin) || (apuestaHecha > saldo)) {
        cartel = `Su apuesta de $${apuestaHecha} esta fuera del minimo de $${apumin} o el maximo de $${apumax}. O supera su crédito de $${saldo}`;
        errorEntrada = false
      }
      else {

        if (apuestaHecha >= apumin && apuestaHecha <= apumax) { errorEntrada = true }

      }



    }

  } while (!errorEntrada)

  return apuestaHecha;
}


export function stop(): void {

  let pausa = rls.question(igualoCadena("", 28, " ") + `Presione una tecla ... `.green);
}

//-----------------------------------------
// valida la entrada de dos/tres cadenas
export function ingresarString(cartel: string, cad1: string, cad2: string, cad3?: string): string {
  let cadena: string = "";
  let errorEntrada: boolean = true;
  let errorIngreso: boolean = true;

  do {
    console.clear();
    // para evitar el scroll indefinido usamos una variable bool 
    if (!errorIngreso) {

      mensajeAlerta("ingreso inválido. reintente", "rojo");
      errorIngreso = true;
    }

    mensajeAlerta(cartel, "azul");
    cadena = rls.question(igualoCadena("", 31, " ") + `Ingrese valor: `.green).toLowerCase();


    if (cadena === cad1 || cadena === cad2 || cadena === cad3) {

      errorEntrada = false;
      //errorIngreso = true;

    }
    else { errorIngreso = false; }


  } while (errorEntrada);

  console.clear();
  return cadena;
}

// ---------------------------------------------
// funciones parea dibujar tablero de ruleta
// ---------------------------------------------

const apuesta: number[] = [6, 9, 35, 17, 15, 23, 36];
const PADIZQUIERDO: string = igualoCadena(" ", 8, " ");
const colorApuesta: string = `white`;


//----- defino colors de rojo o negro por defecto --------
let colorRojo: string = `bgRed`;
let colorNegro: string = `bgBlack`;
const rojo: string = "    Rojo   ";
const negro: string = "   Negro   ";

//----- defino colors de par o impar por defecto --------
let colorPar: string = `white`;
let colorImpar: string = `white`;
const impar: string = "   Impar   ";
const par: string = "    Par    ";

//----- defino colors de docena por defecto --------
let colorPriDoc: string = `white`;
let colorSegDoc: string = `white`;
let colorTerDoc: string = `white`;
const priDoc: string = "        1ra doc        ";
const segDoc: string = "        2da doc        ";
const terDoc: string = "        3ra doc        ";


const nrosTablero: number[] = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
const distribucionTablero: string[] = ["  3  ", "  6  ", "  9  ", " 1 2 ", " 1 5 ", " 1 8 ", " 2 1 ", " 2 4 ",
  " 2 7 ", " 3 0 ", " 3 3 ", " 3 6 ", "  2  ", "  5  ", "  8  ", " 1 1 ", " 1 4 ", " 1 7 ", " 2 0 ", " 2 3 ",
  " 2 6 ", " 2 9 ", " 3 2 ", " 3 5 ", "  1  ", "  4  ", "  7  ", " 1 0 ", " 1 3 ", " 1 6 ", " 1 9 ", " 2 2 ",
  " 2 5 ", " 2 8 ", " 3 1 ", " 3 4 "];

const colorRuleta = ["rojo", "negro", "rojo", "rojo", "negro", "rojo", "rojo",
  "negro", "rojo", "rojo", "negro", "rojo", "negro", "rojo", "negro",
  "negro", "rojo", "negro", "negro", "rojo", "negro", "negro", "rojo",
  "negro", "rojo", "negro", "rojo", "negro", "negro", "rojo", "rojo",
  "negro", "rojo", "negro", "negro", "rojo"];

let esCero: string = "     ".bgGreen;
let cero: string[] = ["╔════".green, "║".green + esCero, "║".green + esCero, "╚═════".green, "                  "];


let bordeSuperior: string = cero[0] + "═╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╗".green;
let lineaInternedia: string = "║".green + esCero + "╠═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╣".green;
let teceraLinea: string = "║     ║  4  ║  7  ║ 1 0 ║ 1 3 ║ 1 6 ║ 1 9 ║ 2 2 ║ 2 4 ║ 2 8 ║ 3 1 ║ 3 4 ║".blue;
let bordeInferior: string = "║".green + `${esCero}` + "╠═════╩═════╩═════╩═════╬═════╩═════╩═════╩═════╬═════╩═════╩═════╩═════╣".green;
//let cuartaLinea: string = cero[2] + "║".green + (priDoc as any)[colorPriDoc] + "║".green + (segDoc as any)[colorSegDoc].white + "║".green + (terDoc as any)[colorTerDoc].white + "║".green;
let quintaLinea: string = cero[3] + "╩═══════════╦═══════════╬═══════════╦═══════════╬═══════════╦═══════════╝".green;
//let lineaParRojo: string = cero[4] + "║".green + (par as any)[colorPar] + "║".green + (rojo as any)[colorRojo] + "║" + (negro as any)[colorNegro] + "║".green + (impar as any)[colorImpar] + "║            ".green;
let ultimaLinea: string = "                  ╚═══════════╩═══════════╩═══════════╩═══════════╝            ".green;

// si se aposto por cero se pinta esa zona del tablero
function salioCero(apuestaNumero: number[]): void {

  let indiceApuesta: number = apuestaNumero.findIndex(apu => apu === 0);
  if (indiceApuesta != -1) { esCero = "     ".bgBlue; }

  cero = ["╔════".green, "║".green + esCero, "║".green + esCero, "╚═════".green, "                  "];

  bordeSuperior = cero[0] + "═╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╗".green;
  lineaInternedia = "║".green + `${esCero}` + "╠═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╣".green;
  teceraLinea = "║     ║  4  ║  7  ║ 1 0 ║ 1 3 ║ 1 6 ║ 1 9 ║ 2 2 ║ 2 4 ║ 2 8 ║ 3 1 ║ 3 4 ║".blue;
  bordeInferior = "║".green + `${esCero}` + "╠═════╩═════╩═════╩═════╬═════╩═════╩═════╩═════╬═════╩═════╩═════╩═════╣".green;
  //cuartaLinea = cero[2] + "║".green + (priDoc as any)[colorPriDoc] + "║".green + (segDoc as any)[colorSegDoc].white + "║".green + (terDoc as any)[colorTerDoc].white + "║".green;
  quintaLinea = cero[3] + "╩═══════════╦═══════════╬═══════════╦═══════════╬═══════════╦═══════════╝".green;
  //lineaParRojo = cero[4] + "║".green + (par as any)[colorPar] + "║".green + (rojo as any)[colorRojo] + "║" + (negro as any)[colorNegro] + "║".green + (impar as any)[colorImpar] + "║            ".green;
  ultimaLinea = "                  ╚═══════════╩═══════════╩═══════════╩═══════════╝            ".green;

}

//--------------------------------------------
// dibuja el tablero
export function dibujaTablero(apuestaNumero: number[], apuestaColor: string[]): void {

  armaColorParDoc(apuestaColor);

  salioCero(apuestaNumero);

  console.clear();

  console.log(PADIZQUIERDO + bordeSuperior);

  armaLineaTablero(apuestaNumero);

  console.log(PADIZQUIERDO + bordeInferior);
  //console.log(PADIZQUIERDO + cuartaLinea);
  console.log(PADIZQUIERDO + cero[2] + "║".green + (priDoc as any)[colorPriDoc] + "║".green + (segDoc as any)[colorSegDoc].white + "║".green + (terDoc as any)[colorTerDoc].white + "║".green)
  console.log(PADIZQUIERDO + quintaLinea);
  console.log(PADIZQUIERDO + "                  ║".green + (par as any)[colorPar] + "║".green + (rojo as any)[colorRojo] + "║" + (negro as any)[colorNegro] + "║".green + (impar as any)[colorImpar] + "║            ".green)
  //console.log(PADIZQUIERDO + lineaParRojo);
  console.log(PADIZQUIERDO + ultimaLinea);

}

// se definen colores para los nro apostados
function armaColorParDoc(colores: string[]): void {

  // por cada lugar del arreglo asigna fondo azul para lo apostado
  const azul = `bgBlue`;

  if (colores.length === 0) {
    colorPriDoc = colorApuesta;
    colorSegDoc = colorApuesta;
    colorTerDoc = colorApuesta;
    colorPar = colorApuesta;
    colorImpar = colorApuesta;
    colorRojo = colorApuesta;
    colorNegro = colorApuesta;
  }
  colores.forEach(apuesta => {

    if (apuesta === "rojo") { colorRojo = azul; }
    if (apuesta === "negro") { colorNegro = azul; }
    if (apuesta === "par") { colorPar = azul; }
    if (apuesta === "impar") { colorImpar = azul; }
    if (apuesta === "primera") { colorPriDoc = azul; }
    if (apuesta === "segunda") { colorSegDoc = azul; }
    if (apuesta === "tercera") { colorTerDoc = azul; }


  })

}



function armaLineaTablero(apuesta: number[]): void {

  const colorRuletaAux: string[] = [...colorRuleta]; // crea una copia auxiliar

  // establece un color ("verde") para todos aquellos nros que tengan una apuesta realizada
  apuesta.forEach(elemt => {

    let indiceApuesta: number = nrosTablero.findIndex(apu => apu === elemt);
    if (indiceApuesta != -1) { colorRuletaAux[indiceApuesta] = "verde"; }


  })

  const INICIO: string = "║".green;

  let inicio: string = cero[1] + INICIO;

  distribucionTablero.forEach((casillero, indice) => {

    if (colorRuletaAux[indice] === "verde") {
      casillero = casillero.bgBlue;
    }
    else {
      if (colorRuletaAux[indice] === "rojo") {
        casillero = casillero.white.bgRed;
      }
      else {
        casillero = casillero.bgBlack.white;
      }
    }

    inicio += casillero + INICIO;

    if ((indice + 1) % 12 === 0 && indice <= 37) {
      console.log(PADIZQUIERDO + inicio);
      if (indice < 30) {
        console.log(PADIZQUIERDO + lineaInternedia); inicio = cero[2] + INICIO;
      }

    }

  })
}

//--------------------------------------------------------
// muestra un mensaje que se le puede variar el color
export function mensajeAlertaSinMarco(mensaje: string, color: string): void {

  let ancho = mensaje.length;
  let set: number = 2;
  let padIzquierdo: number = 20;

  if (ancho % 2 != 0) { ancho += 1; mensaje = mensaje + " "; }
  else { padIzquierdo = 50 - ancho / 2; }

  //mensaje = igualoCadena(mensaje,ancho,"").green;

  if (color.toLocaleLowerCase().trim() === "rojo") { mensaje = igualoCadena(mensaje, ancho, "").red; }
  if (color.toLocaleLowerCase().trim() === "verde") { mensaje = igualoCadena(mensaje, ancho, "").green; }
  if (color.toLocaleLowerCase().trim() === "azul") { mensaje = igualoCadena(mensaje, ancho, "").blue; }
  if (color.toLocaleLowerCase().trim() === "amarillo") { mensaje = igualoCadena(mensaje, ancho, "").yellow; }

  padIzquierdo = 50 - ancho / 2;
  console.log(igualoCadena(" ", padIzquierdo, " ") + mensaje + " ");
}

//---------- muestra resultado de la apuesta en ruleta ---------------------

//arma un listado con las apuestas hechas al momento de pagar
export function mostrarResultadoApuesta(apuestas: Apuesta[], montoApostado: number, montoGanado: number): void {

  let tabIzquierdo: string = igualoCadena(" ", 26, " ");
  let lineaSuperior: string = tabIzquierdo +
    igualoCadena(" ┌", 13, "─") + "┬" +
    igualoCadena("─", 11, "─") + "┬" +
    igualoCadena("─", 11, "─") + "┬" +
    igualoCadena("─", 12, "─") + "┐";
  //define linea inferior de titulo
  let lineafinal: string = tabIzquierdo +
    igualoCadena(" └", 13, "─") + "┴" +
    igualoCadena("─", 11, "─") + "┴" +
    igualoCadena("─", 11, "─") + "┴" +
    igualoCadena("─", 12, "─") + "┘";

  let lineafinalParcial: string = tabIzquierdo +
    igualoCadena("  ", 13, " ") + " " +
    igualoCadena(" ", 11, " ") + "└" +
    igualoCadena("─", 11, "─") + "┴" +
    igualoCadena("─", 12, "─") + "┘";

  let lineaInferior: string = tabIzquierdo +
    igualoCadena(" ├", 13, "─") + "┼" +
    igualoCadena("─", 11, "─") + "┼" +
    igualoCadena("─", 11, "─") + "┼" +
    igualoCadena("─", 12, "─") + "┤";

  let lineaInferiorParcial: string = tabIzquierdo +
    igualoCadena(" └", 13, "─") + "┴" +
    igualoCadena("─", 11, "─") + "┼" +
    igualoCadena("─", 11, "─") + "┼" +
    igualoCadena("─", 12, "─") + "┤";

  // define linea que enzabeza el listado                            
  let lineaEncabezado: string = tabIzquierdo + " │ " +
    igualoCadena("Tipo ", 9, " ").blue + " │ " +
    igualoCadena("Valor  ", 9, " ").blue + " │ " +
    igualoCadena("Apostado ", 6, " ").blue + " │ " +
    igualoCadena("Resultado ", 11, " ").blue + "│";

  console.log(lineaSuperior);
  console.log(lineaEncabezado);
  console.log(lineaInferior);

  apuestas.forEach(apuesta => {

    let lineaImprimir: string = tabIzquierdo + " │ " +
      igualoCadena(apuesta.getTipo(), 9, " ").yellow + " │ " +
      igualoCadena(apuesta.getValor().toString(), 9, " ").yellow + " │ " +
      igualoCadena(apuesta.getCantidadApostada().toString(), 9, " ").yellow + " │ " +
      igualoCadena(apuesta.getResultadoApuesta().toString(), 11, " ").yellow + "│";

    console.log(lineaImprimir);
  });

  let lineaResultado: string = tabIzquierdo + "   " +
    igualoCadena(" ", 9, " ").yellow + "  " +
    igualoCadena(" ", 10, " ").yellow + " │ " +
    igualoCadena(montoApostado.toString(), 9, " ").red + " │ " +
    igualoCadena(montoGanado.toString(), 11, " ").green + "│";

  console.log(lineaInferiorParcial);
  console.log(lineaResultado);
  console.log(lineafinalParcial);

}
export function validarValidezApuesta(cartel: string, apumin: number, apumax: number, saldo: number): number {
  let apuestaHecha: number;
  let apuestaString: string = "0";
  let errorEntrada: boolean = true;


  do {
    console.clear();

    mensajeAlerta(cartel, "azul");
    // para evitar el scroll indefinido usamos una variable bool 
    if (!errorEntrada) {

      mensajeAlerta("Ingreso invalido... reintente por favor", "rojo");
      errorEntrada = true;
    }
    // ingresa el nro
    apuestaString = rls.question(igualoCadena("", 31, " ") + "Ingrese el valor: ".green);
    apuestaHecha = parseInt(apuestaString);

    if (isNaN(apuestaHecha)) {
      errorEntrada = false
    } else {


      if ((apuestaHecha > apumax) || (apuestaHecha < apumin) || (apuestaHecha > saldo)) {
        cartel = `Su apuesta de $${apuestaHecha} esta fuera del minimo de $${apumin} o el maximo de $${apumax}. O supera su crédito de $${saldo}`;
        errorEntrada = false
      }
      else {

        if (apuestaHecha >= apumin && apuestaHecha <= apumax) { errorEntrada = true }

      }



    }


    //console.clear();

  } while (!errorEntrada)

  return apuestaHecha;
}
