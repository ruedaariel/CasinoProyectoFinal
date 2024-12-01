"use strict";
// Tipo de apuesta que un jugador puede realizar
//interface ApuestaRuleta {
//    tipo: "numero" | "color" | "parOImpar";
//    valor: any; // El valor depende del tipo de apuesta number, string, string
//    cantidadApostada: number; // Cantidad apostada
//  } 
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ruleta = void 0;
var Apuesta_1 = require("./Apuesta");
var funciones = require("../../Funciones/funciones");
require("colors");
var rls = require("readline-sync");
var juego_1 = require("../juego");
var Ruleta = /** @class */ (function (_super) {
    __extends(Ruleta, _super);
    function Ruleta() {
        var _this = _super.call(this) || this;
        _this.nrosRuleta = [];
        _this.colorRuleta = [];
        //private apuestaMinima: number = 100;
        //private apuestaMaxima: number = 1000;
        _this.apuestas = [];
        _this.bolilla = 0;
        _this.bolillaColor = "";
        _this.bolillaPar = "";
        _this.bolillaDocena = 0;
        _this.apuestaMaxima = 1000;
        _this.apuestaMinima = 100;
        _this.nrosRuleta = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
        ];
        _this.colorRuleta = ["rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo",
            "negro", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro",
            "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo", "negro",
            "rojo", "negro", "rojo", "negro", "rojo", "negro", "rojo",];
        return _this;
    }
    Ruleta.prototype.comenzarAJugar = function (jugador) {
        var JugadorRuleta = jugador;
        if (!this.verificarCredito(jugador)) {
            return;
        } // retorno a casino
        while (true) {
            funciones.mensajeAlerta("Bienvenido ".concat(jugador.getNombre(), " a la mesa de ruleta. Dispone de $").concat(jugador.getACredito()) + " para apostar", "azul");
            funciones.mensajeAlerta("Las apuestas permitidas son un minimo de $".concat(this.apuestaMinima, " y un maximo de $").concat(this.apuestaMaxima, " "), "amarillo");
            funciones.mensajeAlerta(" -- Presionando cualquier tecla va a jugar -- . -- Pulsando 0 -- vuelve al casino ", "azul");
            var pausa = rls.question((funciones.igualoCadena("", 31, " ") + "Presione su opcion..."));
            if (pausa === "0") {
                return;
            }
            this.apuestas = []; // asegur tener vacio el arreglo de apuestas
            // jugador habilitado voy a apostar
            this.apostar(JugadorRuleta);
            // tiramos bolilla y jugamos
            this.jugar();
            var paraAcreditar = this.pagar();
            // actualizo el crédito del cliente.
            JugadorRuleta.setCredito(jugador.getACredito() - paraAcreditar);
            //console.log(" ******* -> " + paraAcreditar + " <- ******* ");
            //funciones.stop();
        }
    };
    // private verificarCredito(jugador:Cliente): boolean {
    //   if ((jugador.getACredito() < this.apuestaMinima)  || (jugador.getACredito() === 0)) { 
    //     funciones.mensajeAlerta(`El Cliente ${jugador.getNombre()} no dispone de saldo suficiente para apostar`,"rojo");
    //     funciones.mensajeAlerta(`Puede volver al Casino para recargar credito. Muchas Gracias.`,"azul");
    //     let pausa: string = rls.question((funciones.igualoCadena("", 31, " ") + "Presione una tecla ..."))
    //     return false;} 
    //     return true;
    // }
    Ruleta.prototype.tirarBolilla = function () {
        var numero = Math.floor(Math.random() * this.nrosRuleta.length);
        return numero;
        //return 0;
    };
    // funcion calcular ganancia recibe un arreglo de apuestas armado en el casino
    // tira la bollilla
    // recorre el arreglo y llama a la funcion evaluarapuesta por cada elemento del arreglo
    // retorna el monto ganado en cada apuesta
    // lo acumula y devuelve el monto total.
    Ruleta.prototype.jugar = function () {
        this.bolilla = this.tirarBolilla(); // numero que salio al tirar la bolilla
    };
    Ruleta.prototype.pagar = function () {
        var _this = this;
        var apostado = 0;
        var montoGanado = 0;
        console.clear();
        this.apuestas.forEach(function (apuesta) {
            montoGanado += _this.evaluarApuesta(apuesta, _this.bolilla);
            apostado += apuesta.getCantidadApostada();
        });
        var resultadoBolilla = funciones.igualoCadena(" Bolilla: -> " + "".concat(this.bolilla) + " <-  -> " + "".concat(this.bolillaColor) + " <- -> " + "".concat(this.bolillaPar) + " <- -> " + "".concat(this.bolillaDocena, " <-"), 46, " ");
        funciones.mensajeAlerta(resultadoBolilla, "amarillo");
        funciones.mensajeAlerta(funciones.igualoCadena("Lo apostado fue: ", 46, " "), "azul");
        funciones.mostrarResultadoApuesta(this.apuestas, apostado, montoGanado);
        funciones.stop();
        //console.log(`Apostaste ${apostado} y ganaste ${montoGanado}`);
        return montoGanado;
    };
    // evaluar apuesta recibe un objeto de tipo Apuesta y el numero que resulto de tira la bolilla
    // en funcion del tipo de apuesta evalua si hubo acierto o no
    // y ademas calcula el monto ganado en funcion de lo apostado
    Ruleta.prototype.evaluarApuesta = function (apuesta, bolilla) {
        //let numero = this.tirarBolilla(); // numero que salio al tirar la bolilla
        this.bolillaColor = this.colorRuleta[bolilla]; // color del nro que salio
        //let docena = 0; // docena donde se encuentra el nro
        var montoGanado = 0;
        if (bolilla / 12 - Math.trunc(bolilla / 12) === 0) {
            this.bolillaDocena = Math.trunc(bolilla / 12);
        }
        else {
            this.bolillaDocena = Math.floor(bolilla / 12) + 1;
        }
        this.bolillaPar = ""; // se almacena si par o impar el nro que salio
        if (bolilla % 2 === 0) {
            this.bolillaPar = "par";
        }
        else {
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
    };
    Ruleta.prototype.mostrarApuesta = function () {
        var contador = 1;
        var separador = " a ";
        var apuestaANro1 = "Tu apuesta: |";
        var apuestaANro2 = "| ";
        this.apuestas.forEach(function (apuesta) {
            if (apuesta.getTipo() === "numero") {
                separador = " al ";
                contador++;
            }
            else {
                separador = " a ";
                contador++;
            }
            if (contador <= 6) {
                apuestaANro1 += "$".concat(apuesta.getCantidadApostada()) + separador + "".concat(apuesta.getValor(), " |");
            }
            else {
                apuestaANro2 += "$".concat(apuesta.getCantidadApostada()) + separador + "".concat(apuesta.getValor(), " |");
            }
            //apuestaANro += `$${apuesta.getCantidadApostada()}` + separador+`${apuesta.getValor()} |`;
        });
        if (contador <= 6) {
            funciones.mensajeAlertaSinMarco(apuestaANro1, "amarillo");
        }
        else {
            funciones.mensajeAlertaSinMarco(apuestaANro1, "amarillo");
            funciones.mensajeAlertaSinMarco(apuestaANro2, "amarillo");
        }
    };
    // apostar recibe todas las apuestas de un jugador sobre el tablero
    Ruleta.prototype.apostar = function (jugador) {
        var opcion;
        var errorIngreso = true;
        var cartel = "";
        console.clear();
        var opcionesApuesta = ['1. Apuesta a Numero',
            '2. Apuesta a Color',
            '3. Apuesta a Par o Impar',
            '4. Apuesta a Docena',
            '0. Finalizar Apuesta'];
        do {
            this.preparaDatosTablero();
            if (this.apuestas.length != 0) {
                var cartel_1 = this.mostrarApuesta();
            }
            if (jugador.getACredito() === 0) {
                cartel = "".concat(jugador.getNombre(), " su saldo es $0. Finalice apuesta ").red;
            }
            else {
                cartel = " ".concat(jugador.getNombre(), " Tomamos su apuesta ");
            }
            funciones.pantallaMenu(cartel, opcionesApuesta, 30, 40, 2);
            var CreditoParApostar = " Dispone de $".concat(jugador.getACredito(), " ");
            if (!errorIngreso) {
                funciones.lineaConRecuadroError(30, "Opción inválida. Por favor, reinteinte", 40, 2);
            }
            opcion = rls.question(funciones.igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green);
            switch (opcion) {
                case "1":
                    var numero = funciones.validarNumeroEntre("Apueste por un nro entre 0 y 36", 0, 36, 0);
                    var apuestaN = funciones.validarNumeroEntre("Realice su apuesta. " + CreditoParApostar, this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
                    jugador.setCredito(jugador.getACredito() - apuestaN);
                    this.apuestas.push(new Apuesta_1.Apuesta("numero", numero.toString(), apuestaN));
                    console.clear();
                    break;
                case "2":
                    var cadenaC = funciones.ingresarString("Ingrese \"rojo\" o \"negro\"", "rojo", "negro");
                    var apuestaC = funciones.validarNumeroEntre("Realice su apuesta. Dispone de $ ".concat(jugador.getACredito()), this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
                    jugador.setCredito(jugador.getACredito() - apuestaC);
                    this.apuestas.push(new Apuesta_1.Apuesta("color", cadenaC, apuestaC));
                    console.clear();
                    break;
                case "3":
                    var cadenaP = funciones.ingresarString("Ingrese \"par\" o \"impar\"", "par", "impar");
                    var apuestaP = funciones.validarNumeroEntre("Realice su apuesta. Dispone de $ ".concat(jugador.getACredito()), this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
                    jugador.setCredito(jugador.getACredito() - apuestaP);
                    this.apuestas.push(new Apuesta_1.Apuesta("paroimpar", cadenaP, apuestaP));
                    console.clear();
                    break;
                case "4":
                    var cadenaD = funciones.ingresarString("Ingrese \"primera\" o \"segunda\" o \"tercera\" docena", "primera", "segunda", "tercera");
                    var apuestaD = funciones.validarNumeroEntre("Realice su apuesta. Dispone de $ ".concat(jugador.getACredito()), this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
                    jugador.setCredito(jugador.getACredito() - apuestaD);
                    this.apuestas.push(new Apuesta_1.Apuesta("docena", cadenaD, apuestaD));
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
    };
    Ruleta.prototype.preparaDatosTablero = function () {
        var arregloNumeros = [];
        var arregloExtras = [];
        this.apuestas.forEach(function (apuesta) {
            if (apuesta.getTipo() === "numero") {
                arregloNumeros.push(parseInt(apuesta.getValor()));
            }
            else {
                arregloExtras.push(apuesta.getValor());
            }
        });
        //console.log(this.apuestas);
        //console.log("****" + arregloNumeros);
        //console.log(arregloExtras);
        //funciones.stop();
        funciones.dibujaTablero(arregloNumeros, arregloExtras);
    };
    return Ruleta;
}(juego_1.Juego));
exports.Ruleta = Ruleta;
