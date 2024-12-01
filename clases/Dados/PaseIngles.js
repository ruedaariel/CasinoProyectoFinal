"use strict";
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
exports.PaseIngles = void 0;
var funciones = require("../../Funciones/funciones");
var rls = require("readline-sync");
require("colors");
var juego_1 = require("../juego");
var PaseIngles = /** @class */ (function (_super) {
    __extends(PaseIngles, _super);
    function PaseIngles() {
        var _this = _super.call(this) || this;
        _this.dado1 = 0;
        _this.dado2 = 0;
        _this.punto = 0;
        _this.apuesta = 0; //monto de la apuesta
        _this.gano = false;
        _this.setNombre("Pase Ingles");
        _this.setApuestaMinima(100);
        _this.setApuestaMaxima(10000);
        return _this;
    }
    PaseIngles.prototype.getGano = function () {
        return this.gano;
    };
    PaseIngles.prototype.tirarDados = function () {
        this.dado1 = Math.floor(Math.random() * 6) + 1;
        this.dado2 = Math.floor(Math.random() * 6) + 1;
    };
    PaseIngles.prototype.inicializarNuevoJuego = function () {
        this.dado1 = 0;
        this.dado2 = 0;
        this.gano = false;
        this.punto = 0;
    };
    PaseIngles.prototype.validarMontoApuesta = function (valor, montoMinimo, montoMaximo) {
        // return !isNaN(parseInt(valor)) && parseInt(valor) == 0 || parseInt(valor) >= montoMinimo && parseInt(valor) <= montoMaximo; 
        return !isNaN(parseInt(valor)) && (parseInt(valor) == 0 || (parseInt(valor) >= montoMinimo && parseInt(valor) <= montoMaximo));
    };
    PaseIngles.prototype.ingresarApuesta = function (montoMinimo, montoMaximo) {
        var montoApuesta;
        var montoApuestaString; //se ingresa como string y despues se convierte
        var errorEntrada = true;
        do {
            // console.clear();
            funciones.mensajeAlerta("La apuesta puede variar entre ".concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima), "azul");
            // para evitar el scroll indefinido usamos una variable bool 
            if (!errorEntrada) {
                funciones.mensajeAlerta("Monto inv\u00E1lido. Debe ser un numero entre ".concat(montoMinimo, " y ").concat(montoMaximo), "rojo");
            }
            montoApuestaString = rls.question(funciones.igualoCadena("\n", 31, " ") + 'Ingrese el la apuesta (0: sale): '.green);
            montoApuesta = parseInt(montoApuestaString); //convierte a numero
            if (!this.validarMontoApuesta(montoApuestaString, montoMinimo, montoMaximo)) {
                errorEntrada = false;
            }
        } while (!this.validarMontoApuesta(montoApuestaString, montoMinimo, montoMaximo));
        return parseInt(montoApuestaString);
    };
    PaseIngles.prototype.apostar = function (jugador) {
        var montoApuesta = this.ingresarApuesta(this.apuestaMinima, this.apuestaMaxima);
        if (montoApuesta != 0) { //con 0 sale
            if (jugador.getACredito() < montoApuesta) { //controla que tenga credito suficiente
                funciones.mensajeAlerta("No tiene suficiente credito", "rojo");
            }
            else {
                this.apuesta = montoApuesta;
                jugador.setCredito(jugador.getACredito() - this.apuesta); //antes de jugar, le resta la apuesta al credito
                this.jugar();
                var montoaPagar = this.pagar(); //con los datos de la clase, calcula cuanto le tiene que pagar, sale con 0 si perdió
                if (montoaPagar > 0) {
                    funciones.mensajeAlerta("Felicitaciones!  GANO ".concat(montoaPagar, "$ \uD83D\uDCB0\uD83D\uDCB0\uD83D\uDCB0"), "verde");
                    var saldoExistente = jugador.getACredito();
                    jugador.setCredito(saldoExistente + montoaPagar); //le acredita el premio
                }
                else {
                    funciones.mensajeAlerta("Lo siento ".concat(jugador.getNombre(), " , has perdido esta vez. \uD83D\uDE22 \u00A1No te rindas, int\u00E9ntalo de nuevo!"), "amarillo");
                }
                funciones.mensajeAlerta("Saldo actual: ".concat(jugador.getACredito(), "$"), "verde"); //muestra el credito que le quedó al jugador
                //  let caracter = rls.question("\n Presione una tecla para continuar ...").blue;
            }
        }
    };
    PaseIngles.prototype.jugar = function () {
        this.inicializarNuevoJuego();
        //primera jugada
        console.clear();
        funciones.mensajeAlerta("Estas en el Tiro de Salida, con 11 o 7, ganás", "azul");
        this.tirarDados();
        funciones.dibujaUnDado(this.dado1, this.dado2);
        funciones.mensajeAlertaSinMarco("Dados: ".concat(this.dado1, " + ").concat(this.dado2, " = ").concat(this.dado1 + this.dado2), "azul");
        if (this.dado1 + this.dado2 == 7 || this.dado1 + this.dado2 == 11) { //gana con 7 u 11
            this.gano = true;
        }
        else {
            if (this.dado1 + this.dado2 == 2 || this.dado1 + this.dado2 == 3 || this.dado1 + this.dado2 == 12) { //pierde con 2,3 o 12
                this.gano = false;
            }
            else {
                this.punto = this.dado1 + this.dado2;
            }
            // jugada de punto
            if (this.punto != 0) { //si ya ganó o perdió, el punto queda en 0
                var salida = "SIGUE";
                var caracter = rls.question("\n No ganaste, no perdiste ... sigues jugando ...   \n\n Presione una tecla para continuar ...".yellow);
                do {
                    console.clear();
                    funciones.mensajeAlerta("Estas en el Tiro de Punto, con ".concat(this.punto, ", gan\u00E1s"), "azul");
                    this.tirarDados();
                    funciones.dibujaUnDado(this.dado1, this.dado2);
                    funciones.mensajeAlertaSinMarco("Dados: ".concat(this.dado1, " + ").concat(this.dado2, " = ").concat(this.dado1 + this.dado2), "azul");
                    if (this.dado1 + this.dado2 == this.punto) { //gana cuando sale el punto
                        this.gano = true;
                        salida = "GANO";
                    }
                    else {
                        if (this.dado1 + this.dado2 == 7) { //pierde si sale el 7
                            this.gano = false;
                            salida = "PERDIO";
                        }
                        else {
                            //funciones.mensajeAlertaSinMarco(`\n \n Sigues jugando ...`, "amarillo");
                            var caracter_1 = rls.question("\n  Sigues jugando ...   \n\n Presione una tecla para continuar ...".yellow);
                        }
                    }
                } while (salida == "SIGUE");
            }
        }
    };
    PaseIngles.prototype.pagar = function () {
        if (this.gano) {
            return this.apuesta * 2;
        }
        return 0; //devuelve 0 si perdió
    };
    return PaseIngles;
}(juego_1.Juego));
exports.PaseIngles = PaseIngles;
