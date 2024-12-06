"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuGenerico = menuGenerico;
exports.pantallaMenu = pantallaMenu;
exports.cierreSuperior = cierreSuperior;
exports.linea = linea;
exports.cierreInferior = cierreInferior;
exports.armaLinea = armaLinea;
exports.lineaConRecuadro = lineaConRecuadro;
exports.armaLineaError = armaLineaError;
exports.lineaConRecuadroError = lineaConRecuadroError;
exports.separador = separador;
exports.mensajeAlerta = mensajeAlerta;
exports.igualoCadena = igualoCadena;
exports.dibujaUnDado = dibujaUnDado;
exports.validarNumeroEntre = validarNumeroEntre;
exports.stop = stop;
exports.ingresarString = ingresarString;
exports.dibujaTablero = dibujaTablero;
exports.mensajeAlertaSinMarco = mensajeAlertaSinMarco;
exports.mostrarResultadoApuesta = mostrarResultadoApuesta;
exports.validarValidezApuesta = validarValidezApuesta;
require("colors");
var rls = require("readline-sync");
// resuleve la logica de la seleccion de opciones conm manejo del error
// servicio => es un aregllo que define las opciones y su texto y sirve para pasarlo a
// pantalla menu para dibujarlo 
function menuGenerico() {
    var opcion;
    var errorIngreso = true;
    console.clear();
    var servicios = ['1. Opcion 1',
        '2. Opcion 2',
        '3. Opcion 3',
        '4. Opcion 4',
        '5. Opcion 5',
        '0. Salir'];
    do {
        pantallaMenu(" Titulo general", servicios, 30, 40, 2);
        if (!errorIngreso) {
            lineaConRecuadroError(30, "Opción inválida. Por favor, reinteinte", 40, 2);
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
function pantallaMenu(titulo, opciones, padIzquierdo, ancho, set) {
    // armo un cuadro con el menu de opciones
    lineaConRecuadro(padIzquierdo, titulo, ancho, set);
    cierreSuperior(padIzquierdo, ancho, set);
    opciones.forEach(function (element) { armaLinea(padIzquierdo, element, ancho, set); });
    cierreInferior(padIzquierdo, ancho, set);
}
// arma linea superior de cuadro
function cierreSuperior(padIzquierdo, ancho, set) {
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
function linea(padIzquierdo, ancho, set) {
    if (set === 1) {
        console.log(igualoCadena(" ", padIzquierdo, " ") + "" + igualoCadena("─", ancho, "─") + "");
    }
    else {
        console.log(igualoCadena(" ", padIzquierdo, " ") + "" + igualoCadena("═", ancho, "═") + "");
    }
}
// arma linea inferior de cuadro
function cierreInferior(padIzquierdo, ancho, set) {
    if (set === 1) {
        console.log(igualoCadena(" ", padIzquierdo, " ") + "└" + igualoCadena("─", ancho, "─") + "┘");
    }
    else {
        console.log(igualoCadena(" ", padIzquierdo, " ") + "╚" + igualoCadena("═", ancho, "═") + "╝");
    }
}
// arma las lineas interna de un cuadro
function armaLinea(padIzquierdo, texto, ancho, set) {
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
function lineaConRecuadro(padIzquierdo, texto, ancho, set) {
    //igualoCadena(texto,ancho," ");
    cierreSuperior(padIzquierdo, ancho, set);
    armaLinea(padIzquierdo, texto, ancho, set);
    cierreInferior(padIzquierdo, ancho, set);
}
// arma las lineas interna de un cuadro
function armaLineaError(padIzquierdo, texto, ancho, set) {
    if (set === 1) {
        console.log(igualoCadena(" ", padIzquierdo, " ") + "│ " + igualoCadena(texto, ancho - 1, " ").red + "│");
    }
    else {
        console.log(igualoCadena(" ", padIzquierdo, " ") + "║ " + igualoCadena(texto, ancho - 1, " ").red + "║");
    }
}
// genera una linea enmarcada
function lineaConRecuadroError(padIzquierdo, texto, ancho, set) {
    cierreSuperior(padIzquierdo, ancho, set);
    armaLineaError(padIzquierdo, texto, ancho, set);
    cierreInferior(padIzquierdo, ancho, set);
}
function separador(padIzquierdo, ancho, set) {
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
function mensajeAlerta(mensaje, color) {
    var ancho = mensaje.length;
    var set = 2;
    var padIzquierdo = 20;
    if (ancho % 2 != 0) {
        ancho += 1;
        mensaje = mensaje + " ";
    }
    else {
        padIzquierdo = 50 - ancho / 2;
    }
    //mensaje = igualoCadena(mensaje,ancho,"").green;
    if (color.toLocaleLowerCase().trim() === "rojo") {
        mensaje = igualoCadena(mensaje, ancho, "").red;
    }
    if (color.toLocaleLowerCase().trim() === "verde") {
        mensaje = igualoCadena(mensaje, ancho, "").green;
    }
    if (color.toLocaleLowerCase().trim() === "azul") {
        mensaje = igualoCadena(mensaje, ancho, "").blue;
    }
    if (color.toLocaleLowerCase().trim() === "amarillo") {
        mensaje = igualoCadena(mensaje, ancho, "").yellow;
    }
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
function igualoCadena(cadena, largo, caracter) {
    var cadenaNormalizada = cadena.padEnd(largo, caracter);
    return cadenaNormalizada;
}
function dibujaUnDado(dado1, dado2) {
    var todosLosDados = [["╔════╦════╦════╗",
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
            "╚════╩════╩════╝"]];
    var bordeSuperior1 = "┌────┬────┬────┐";
    var primeraLinea1 = "│ ██ │ ██ │ ██ │";
    var lineaInternedia1 = "├────┼────┼────┤";
    var segundaLInea1 = "│ ██ │ ██ │ ██ │";
    var teceraLinea1 = "│ ██ │ ██ │ ██ │";
    var ultimaLinea1 = "└────┴────┴────┘";
    console.log("\n");
    var todosLosDadosAux = __spreadArray([], todosLosDados, true);
    var dadoUno = __spreadArray([], todosLosDadosAux[dado1 - 1], true);
    var dadoDos = __spreadArray([], todosLosDadosAux[dado2 - 1], true);
    for (var i = 0; i < dadoUno.length; i++) {
        console.log("                               " + dadoUno[i] + "    " + dadoDos[i]);
    }
}
// valida la entrada de dos numeros
function validarNumeroEntre(cartel, min, max, averificar) {
    var numero;
    var errorEntrada = true;
    while (true) {
        console.clear();
        mensajeAlerta(cartel, "azul");
        // para evitar el scroll indefinido usamos una variable bool 
        if (!errorEntrada) {
            mensajeAlerta("Ingreso invalido... reintente por favor", "rojo");
            errorEntrada = true;
        }
        numero = rls.questionInt(igualoCadena("", 31, " ") + "Ingrese el valor: ".green);
        if (numero >= averificar || averificar < min) {
            cartel = "No dispone de cr\u00E9dito para realizar una apuesta de $".concat(numero, " su saldo m\u00E1ximo es $").concat(averificar);
            errorEntrada = false;
        }
        if (numero >= min && numero <= max) {
            break;
        }
        errorEntrada = false;
        console.clear();
    }
    return numero;
}
function stop() {
    var pausa = rls.question(igualoCadena("", 28, " ") + "Presione una tecla ... ".green);
}
// valida la entrada de dos/tres cadenas
function ingresarString(cartel, cad1, cad2, cad3) {
    var cadena = "";
    var errorEntrada = true;
    var errorIngreso = true;
    do {
        console.clear();
        // para evitar el scroll indefinido usamos una variable bool 
        if (!errorIngreso) {
            mensajeAlerta("ingreso inválido. reintente", "rojo");
            errorIngreso = true;
        }
        mensajeAlerta(cartel, "azul");
        cadena = rls.question(igualoCadena("", 31, " ") + "Ingrese valor: ".green);
        if (cadena === cad1 || cadena === cad2 || cadena === cad3) {
            errorEntrada = false;
            //errorIngreso = true;
        }
        else {
            errorIngreso = false;
        }
    } while (errorEntrada);
    console.clear();
    return cadena;
}
// ---------------------------------------------
// funciones parea dibujar tablero de ruleta
// ---------------------------------------------
var apuesta = [6, 9, 35, 17, 15, 23, 36];
var PADIZQUIERDO = igualoCadena(" ", 8, " ");
var colorApuesta = "white";
//----- defino colors de rojo o negro por defecto --------
var colorRojo = "bgRed";
var colorNegro = "bgBlack";
var rojo = "    Rojo   ";
var negro = "   Negro   ";
//----- defino colors de par o impar por defecto --------
var colorPar = "white";
var colorImpar = "white";
var impar = "   Impar   ";
var par = "    Par    ";
//----- defino colors de docena por defecto --------
var colorPriDoc = "white";
var colorSegDoc = "white";
var colorTerDoc = "white";
var priDoc = "        1ra doc        ";
var segDoc = "        2da doc        ";
var terDoc = "        3ra doc        ";
var nrosTablero = [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34];
var distribucionTablero = ["  3  ", "  6  ", "  9  ", " 1 2 ", " 1 5 ", " 1 8 ", " 2 1 ", " 2 4 ",
    " 2 7 ", " 3 0 ", " 3 3 ", " 3 6 ", "  2  ", "  5  ", "  8  ", " 1 1 ", " 1 4 ", " 1 7 ", " 2 0 ", " 2 3 ",
    " 2 6 ", " 2 9 ", " 3 2 ", " 3 5 ", "  1  ", "  4  ", "  7  ", " 1 0 ", " 1 3 ", " 1 6 ", " 1 9 ", " 2 2 ",
    " 2 5 ", " 2 8 ", " 3 1 ", " 3 4 "];
var colorRuleta = ["rojo", "negro", "rojo", "rojo", "negro", "rojo", "rojo",
    "negro", "rojo", "rojo", "negro", "rojo", "negro", "rojo", "negro",
    "negro", "rojo", "negro", "negro", "rojo", "negro", "negro", "rojo",
    "negro", "rojo", "negro", "rojo", "negro", "negro", "rojo", "rojo",
    "negro", "rojo", "negro", "negro", "rojo"];
var esCero = "     ".bgGreen;
var cero = ["╔════".green, "║".green + esCero, "║".green + esCero, "╚═════".green, "                  "];
var bordeSuperior = cero[0] + "═╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╗".green;
var lineaInternedia = "║".green + esCero + "╠═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╣".green;
var teceraLinea = "║     ║  4  ║  7  ║ 1 0 ║ 1 3 ║ 1 6 ║ 1 9 ║ 2 2 ║ 2 4 ║ 2 8 ║ 3 1 ║ 3 4 ║".blue;
var bordeInferior = "║".green + "".concat(esCero) + "╠═════╩═════╩═════╩═════╬═════╩═════╩═════╩═════╬═════╩═════╩═════╩═════╣".green;
var cuartaLinea = cero[2] + "║".green + priDoc[colorPriDoc] + "║".green + segDoc[colorSegDoc].white + "║".green + terDoc[colorTerDoc].white + "║".green;
var quintaLinea = cero[3] + "╩═══════════╦═══════════╬═══════════╦═══════════╬═══════════╦═══════════╝".green;
var lineaParRojo = cero[4] + "║".green + par[colorPar] + "║".green + rojo[colorRojo] + "║" + negro[colorNegro] + "║".green + impar[colorImpar] + "║            ".green;
var ultimaLinea = "                  ╚═══════════╩═══════════╩═══════════╩═══════════╝            ".green;
// si se aposto por cero se pinta esa zona del tablero
function salioCero(apuestaNumero) {
    var indiceApuesta = apuestaNumero.findIndex(function (apu) { return apu === 0; });
    if (indiceApuesta != -1) {
        esCero = "     ".bgBlue;
    }
    cero = ["╔════".green, "║".green + esCero, "║".green + esCero, "╚═════".green, "                  "];
    bordeSuperior = cero[0] + "═╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╦═════╗".green;
    lineaInternedia = "║".green + "".concat(esCero) + "╠═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╬═════╣".green;
    teceraLinea = "║     ║  4  ║  7  ║ 1 0 ║ 1 3 ║ 1 6 ║ 1 9 ║ 2 2 ║ 2 4 ║ 2 8 ║ 3 1 ║ 3 4 ║".blue;
    bordeInferior = "║".green + "".concat(esCero) + "╠═════╩═════╩═════╩═════╬═════╩═════╩═════╩═════╬═════╩═════╩═════╩═════╣".green;
    cuartaLinea = cero[2] + "║".green + priDoc[colorPriDoc] + "║".green + segDoc[colorSegDoc].white + "║".green + terDoc[colorTerDoc].white + "║".green;
    quintaLinea = cero[3] + "╩═══════════╦═══════════╬═══════════╦═══════════╬═══════════╦═══════════╝".green;
    lineaParRojo = cero[4] + "║".green + par[colorPar] + "║".green + rojo[colorRojo] + "║" + negro[colorNegro] + "║".green + impar[colorImpar] + "║            ".green;
    ultimaLinea = "                  ╚═══════════╩═══════════╩═══════════╩═══════════╝            ".green;
}
function dibujaTablero(apuestaNumero, apuestaColor) {
    // veo si salio 0 e inicializo las variables
    armaColorParDoc(apuestaColor);
    salioCero(apuestaNumero);
    armaColorParDoc(apuestaColor);
    console.clear();
    console.log(PADIZQUIERDO + bordeSuperior);
    armaLineaTablero(apuestaNumero);
    console.log(PADIZQUIERDO + bordeInferior);
    console.log(PADIZQUIERDO + cuartaLinea);
    //console.log (PADIZQUIERDO+cero[2]+"║".green+(priDoc as any)[colorPriDoc]+"║".green+(segDoc as any)[colorSegDoc].white+"║".green+(terDoc as any)[colorTerDoc].white+"║".green)
    console.log(PADIZQUIERDO + quintaLinea);
    //console.log(PADIZQUIERDO+"                  ║".green+(par as any)[colorPar]+"║".green+(rojo as any)[colorRojo] +"║"+(negro as any)[colorNegro]+"║".green+(impar as any)[colorImpar]+"║            ".green)
    console.log(PADIZQUIERDO + lineaParRojo);
    console.log(PADIZQUIERDO + ultimaLinea);
}
// se definen colores para los nro apostados
function armaColorParDoc(colores) {
    // por cada lugar del arreglo asigna fondo azul para lo apostado
    var azul = "bgBlue";
    if (colores.length === 0) {
        return;
    }
    colores.forEach(function (apuesta) {
        if (apuesta === "rojo") {
            colorRojo = azul;
        }
        if (apuesta === "negro") {
            colorNegro = azul;
        }
        if (apuesta === "par") {
            colorPar = azul;
        }
        if (apuesta === "impar") {
            colorImpar = azul;
        }
        if (apuesta === "primera") {
            colorPriDoc = azul;
        }
        if (apuesta === "segunda") {
            colorSegDoc = azul;
        }
        if (apuesta === "tercera") {
            colorTerDoc = azul;
        }
    });
}
function armaLineaTablero(apuesta) {
    var colorRuletaAux = __spreadArray([], colorRuleta, true); // crea una copia auxiliar
    // establece un color ("verde") para todos aquellos nros que tengan una apuesta realizada
    apuesta.forEach(function (elemt) {
        var indiceApuesta = nrosTablero.findIndex(function (apu) { return apu === elemt; });
        if (indiceApuesta != -1) {
            colorRuletaAux[indiceApuesta] = "verde";
        }
    });
    var INICIO = "║".green;
    var inicio = cero[1] + INICIO;
    distribucionTablero.forEach(function (casillero, indice) {
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
                console.log(PADIZQUIERDO + lineaInternedia);
                inicio = cero[2] + INICIO;
            }
        }
    });
}
// muestra un mensaje que se le puede variar el color
function mensajeAlertaSinMarco(mensaje, color) {
    var ancho = mensaje.length;
    var set = 2;
    var padIzquierdo = 20;
    if (ancho % 2 != 0) {
        ancho += 1;
        mensaje = mensaje + " ";
    }
    else {
        padIzquierdo = 50 - ancho / 2;
    }
    //mensaje = igualoCadena(mensaje,ancho,"").green;
    if (color.toLocaleLowerCase().trim() === "rojo") {
        mensaje = igualoCadena(mensaje, ancho, "").red;
    }
    if (color.toLocaleLowerCase().trim() === "verde") {
        mensaje = igualoCadena(mensaje, ancho, "").green;
    }
    if (color.toLocaleLowerCase().trim() === "azul") {
        mensaje = igualoCadena(mensaje, ancho, "").blue;
    }
    if (color.toLocaleLowerCase().trim() === "amarillo") {
        mensaje = igualoCadena(mensaje, ancho, "").yellow;
    }
    padIzquierdo = 50 - ancho / 2;
    console.log(igualoCadena(" ", padIzquierdo, " ") + mensaje + " ");
}
//---------- muestra resultado de la apuesta  ---------------------
//arma un listado con las apuestas hechas al momento de pagar
function mostrarResultadoApuesta(apuestas, montoApostado, montoGanado) {
    var tabIzquierdo = igualoCadena(" ", 26, " ");
    var lineaSuperior = tabIzquierdo +
        igualoCadena(" ┌", 13, "─") + "┬" +
        igualoCadena("─", 11, "─") + "┬" +
        igualoCadena("─", 11, "─") + "┬" +
        igualoCadena("─", 12, "─") + "┐";
    //define linea inferior de titulo
    var lineafinal = tabIzquierdo +
        igualoCadena(" └", 13, "─") + "┴" +
        igualoCadena("─", 11, "─") + "┴" +
        igualoCadena("─", 11, "─") + "┴" +
        igualoCadena("─", 12, "─") + "┘";
    var lineafinalParcial = tabIzquierdo +
        igualoCadena("  ", 13, " ") + " " +
        igualoCadena(" ", 11, " ") + "└" +
        igualoCadena("─", 11, "─") + "┴" +
        igualoCadena("─", 12, "─") + "┘";
    var lineaInferior = tabIzquierdo +
        igualoCadena(" ├", 13, "─") + "┼" +
        igualoCadena("─", 11, "─") + "┼" +
        igualoCadena("─", 11, "─") + "┼" +
        igualoCadena("─", 12, "─") + "┤";
    var lineaInferiorParcial = tabIzquierdo +
        igualoCadena(" └", 13, "─") + "┴" +
        igualoCadena("─", 11, "─") + "┼" +
        igualoCadena("─", 11, "─") + "┼" +
        igualoCadena("─", 12, "─") + "┤";
    // define linea que enzabeza el listado                            
    var lineaEncabezado = tabIzquierdo + " │ " +
        igualoCadena("Tipo ", 9, " ").blue + " │ " +
        igualoCadena("Valor  ", 9, " ").blue + " │ " +
        igualoCadena("Apostado ", 6, " ").blue + " │ " +
        igualoCadena("Resultado ", 11, " ").blue + "│";
    console.log(lineaSuperior);
    console.log(lineaEncabezado);
    console.log(lineaInferior);
    apuestas.forEach(function (apuesta) {
        var lineaImprimir = tabIzquierdo + " │ " +
            igualoCadena(apuesta.getTipo(), 9, " ").yellow + " │ " +
            igualoCadena(apuesta.getValor().toString(), 9, " ").yellow + " │ " +
            igualoCadena(apuesta.getCantidadApostada().toString(), 9, " ").yellow + " │ " +
            igualoCadena(apuesta.getResultadoApuesta().toString(), 11, " ").yellow + "│";
        console.log(lineaImprimir);
    });
    var lineaResultado = tabIzquierdo + "   " +
        igualoCadena(" ", 9, " ").yellow + "  " +
        igualoCadena(" ", 10, " ").yellow + " │ " +
        igualoCadena(montoApostado.toString(), 9, " ").red + " │ " +
        igualoCadena(montoGanado.toString(), 11, " ").green + "│";
    console.log(lineaInferiorParcial);
    console.log(lineaResultado);
    console.log(lineafinalParcial);
}
function validarValidezApuesta(cartel, apumin, apumax, saldo) {
    var apuestaHecha;
    var apuestaString = "0";
    var errorEntrada = true;
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
            errorEntrada = false;
        }
        else {
            if ((apuestaHecha > apumax) || (apuestaHecha < apumin) || (apuestaHecha > saldo)) {
                cartel = "Su apuesta de $".concat(apuestaHecha, " esta fuera del minimo de $").concat(apumin, " o el maximo de $").concat(apumax, ". O supera su cr\u00E9dito de $").concat(saldo);
                errorEntrada = false;
            }
            else {
                if (apuestaHecha >= apumin && apuestaHecha <= apumax) {
                    errorEntrada = true;
                }
            }
        }
        //console.clear();
    } while (!errorEntrada);
    return apuestaHecha;
}
