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
exports.Tragamonedas = void 0;
var rls = require("readline-sync");
var juego_1 = require("../../clases/juego");
var funciones = require("../../Funciones/funciones");
var Tragamonedas = /** @class */ (function (_super) {
    __extends(Tragamonedas, _super);
    function Tragamonedas(nombre, apuestaMinima, apuestaMaxima, temaTambores, estructuraTambores, comodin, multiplicador) {
        var _this = _super.call(this) || this;
        _this.resultadoJuego = []; //Se usa en metodo Juego()
        _this.cantApostada = 0; //Se usa en Apostar() y Pagar()
        _this.setNombre(nombre);
        _this.setApuestaMinima(apuestaMinima);
        _this.setApuestaMaxima(apuestaMaxima);
        _this.temaTambores = temaTambores;
        _this.estructuraTambores = estructuraTambores;
        _this.comodin = comodin;
        _this.multiplicador = multiplicador;
        _this.setInicializarTambores();
        return _this;
    }
    Tragamonedas.prototype.setInicializarTambores = function () {
        for (var i = 0; i < this.estructuraTambores.length; i++) {
            this.estructuraTambores[i] = __spreadArray(__spreadArray([], this.temaTambores, true), [this.comodin], false);
        }
    };
    Tragamonedas.prototype.apostar = function (jugador) {
        var premio = 0; //Variable para asignar monto ganado en la jugada
        funciones.mensajeAlerta("Tu cr\u00E9dito actual es de ".concat(jugador.getACredito(), " pesos"), "Azul");
        this.cantApostada = this.ingresarApuesta();
        if (this.cantApostada > jugador.getACredito()) {
            funciones.mensajeAlerta("La apuesta debe ser menor o igual a su credito de $ ".concat(jugador.getACredito()), "Rojo");
        }
        else {
            jugador.setCredito(jugador.getACredito() - this.cantApostada);
            funciones.mensajeAlerta("Apostando ".concat(this.cantApostada, " pesos..."), "Azul");
            this.jugar();
            premio = this.pagar();
            premio += this.pagoBonus(premio);
            jugador.setCredito(jugador.getACredito() + premio);
            funciones.mensajeAlerta(premio > 0 ? "\u00A1GANASTE UN TOTAL DE ".concat(premio, " PESOS!") : "Lo siento, perdiste.", premio > 0 ? "Amarillo" : "Azul");
            funciones.mensajeAlerta("Tu cr\u00E9dito actual es de ".concat(jugador.getACredito(), " pesos"), "Rojo");
        }
    };
    Tragamonedas.prototype.jugar = function () {
        this.resultadoJuego = []; //Vuelvo la rariable a 0 para que no acumule
        for (var i = 0; i < this.estructuraTambores.length; i++) {
            var indice = Math.floor(Math.random() * this.estructuraTambores[i].length);
            this.resultadoJuego.push(this.estructuraTambores[i][indice]);
        }
        funciones.mensajeAlerta("Resultados: ".concat(this.resultadoJuego.join(" | ")), "Amarillo");
    };
    Tragamonedas.prototype.pagar = function () {
        var premio;
        var conteo = {};
        for (var _i = 0, _a = this.resultadoJuego; _i < _a.length; _i++) {
            var resultado = _a[_i];
            if (conteo[resultado]) {
                conteo[resultado]++;
            }
            else {
                conteo[resultado] = 1;
            }
        }
        premio = 0;
        if (conteo[this.comodin]) {
            premio = this.cantApostada * this.multiplicador;
        }
        else {
            for (var key in conteo) {
                if (conteo[key] >= 2) {
                    premio = this.cantApostada * conteo[key];
                }
            }
        }
        return premio;
    };
    Tragamonedas.prototype.ingresarApuesta = function () {
        var montoApuesta = 0;
        var errorEntrada = true;
        do {
            funciones.mensajeAlerta("La apuesta puede variar entre ".concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima, " pesos"), "Amarillo");
            if (!errorEntrada) {
                funciones.mensajeAlerta("Monto inv\u00E1lido. Debe ser un numero entre ".concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima, " pesos"), "Rojo");
            }
            montoApuesta = rls.questionInt(funciones.igualoCadena("", 31, " ") + 'Ingrese la apuesta en pesos (0: sale): '.green);
            if (!this.validarMontoApuesta(montoApuesta)) {
                errorEntrada = false;
            }
        } while (!this.validarMontoApuesta(montoApuesta));
        return montoApuesta;
    };
    Tragamonedas.prototype.validarMontoApuesta = function (valor) {
        return !isNaN(valor) && valor == 0 || valor >= this.apuestaMinima && valor <= this.apuestaMaxima;
    };
    return Tragamonedas;
}(juego_1.Juego));
exports.Tragamonedas = Tragamonedas;
