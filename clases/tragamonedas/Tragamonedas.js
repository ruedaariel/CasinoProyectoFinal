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
exports.Tragamonedas = void 0;
var Tragamonedas = /** @class */ (function () {
    function Tragamonedas(nombre, apuestaMinima, temaTambores, estructuraTambores, comodin, multiplicador) {
        this.apuestaMinima = 0; //apusta mínima del tragamonedas
        this.pagoMaximo = 0; //Pago máximo del tragamonedas
        this.resultadoJuego = []; //Se usa en metodo Juego()
        if (nombre != undefined && nombre != "") {
            this.nombre = nombre.trim();
        }
        else {
            this.nombre = "Tragamonedas";
        }
        this.apuestaMinima = apuestaMinima;
        this.temaTambores = temaTambores;
        this.estructuraTambores = estructuraTambores;
        this.comodin = comodin;
        this.multiplicador = multiplicador;
        this.setInicializarTambores();
    }
    Tragamonedas.prototype.setInicializarTambores = function () {
        for (var i = 0; i < this.estructuraTambores.length; i++) {
            this.estructuraTambores[i] = __spreadArray(__spreadArray([], this.temaTambores, true), [this.comodin], false);
        }
    };
    Tragamonedas.prototype.getNombre = function () {
        return this.nombre;
    };
    Tragamonedas.prototype.setNombre = function (value) {
        if (value != undefined && value.trim() != "") {
            this.nombre = value.trim();
        }
    };
    Tragamonedas.prototype.getApuestaMinima = function () {
        return this.apuestaMinima;
    };
    Tragamonedas.prototype.setApuestaMinima = function (value) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }
    };
    Tragamonedas.prototype.apostar = function (cantidadApostada) {
        this.cantApostada = cantidadApostada;
        if (this.cantApostada < this.getApuestaMinima()) {
            console.log("La apuesta debe ser mayor a ".concat(this.apuestaMinima));
        }
        else {
            console.log("Apostando ".concat(this.cantApostada, " pesos..."));
            this.jugar();
            this.pagar();
            console.log(this.premio > 0 ? "\u00A1Ganaste ".concat(this.premio, " pesos!") : "Lo siento, perdiste.");
        }
    };
    Tragamonedas.prototype.jugar = function () {
        for (var i = 0; i < this.estructuraTambores.length; i++) {
            var indice = Math.floor(Math.random() * this.estructuraTambores[i].length);
            this.resultadoJuego.push(this.estructuraTambores[i][indice]);
        }
        console.log("Resultados: ".concat(this.resultadoJuego.join(" | ")));
    };
    Tragamonedas.prototype.pagar = function () {
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
        this.premio = 0;
        if (conteo[this.comodin]) {
            this.premio = this.cantApostada * this.multiplicador;
        }
        else {
            for (var key in conteo) {
                if (conteo[key] >= 2) {
                    this.premio = this.cantApostada * conteo[key];
                }
            }
        }
    };
    return Tragamonedas;
}());
exports.Tragamonedas = Tragamonedas;
