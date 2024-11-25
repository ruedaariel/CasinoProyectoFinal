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
var rls = require("readline-sync");
var Tragamonedas = /** @class */ (function () {
    function Tragamonedas(nombre, apuestaMinima, apuestaMaxima, temaTambores, estructuraTambores, comodin, multiplicador) {
        this.apuestaMinima = 0; //apuesta mínima del tragamonedas
        this.apuestaMaxima = 0; //Pago máximo del tragamonedas
        this.resultadoJuego = []; //Se usa en metodo Juego()
        if (nombre != undefined && nombre != "") {
            this.nombre = nombre.trim();
        }
        else {
            this.nombre = "Tragamonedas";
        }
        this.apuestaMinima = apuestaMinima;
        this.apuestaMaxima = apuestaMaxima;
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
    Tragamonedas.prototype.getApuestaMaxima = function () {
        return this.apuestaMinima;
    };
    Tragamonedas.prototype.setApuestaMaxima = function (value) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }
    };
    Tragamonedas.prototype.apostar = function (jugador) {
        var premio = 0; //Variable para asignar monto ganado en la jugada
        this.cantApostada = this.ingresarApuesta();
        if (this.cantApostada >= jugador.getACredito()) {
            console.log("La apuesta debe ser menor o igual a su credito de $ ".concat(jugador.getACredito()));
        }
        else {
            jugador.setCredito(jugador.getACredito() - this.cantApostada);
            console.log("Tu cr\u00E9dito actual es de ".concat(jugador.getACredito()));
            console.log("Apostando ".concat(this.cantApostada, " pesos..."));
            this.jugar();
            premio = this.pagar();
            jugador.setCredito(jugador.getACredito() + premio);
            console.log(premio > 0 ? "\u00A1Ganaste ".concat(premio, " pesos!") : "Lo siento, perdiste.");
            console.log("Tu cr\u00E9dito actual es de ".concat(jugador.getACredito()));
        }
    };
    Tragamonedas.prototype.jugar = function () {
        this.resultadoJuego = [];
        for (var i = 0; i < this.estructuraTambores.length; i++) {
            var indice = Math.floor(Math.random() * this.estructuraTambores[i].length);
            this.resultadoJuego.push(this.estructuraTambores[i][indice]);
        }
        console.log("Resultados: ".concat(this.resultadoJuego.join(" | ")));
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
            console.clear();
            console.log("La apuesta puede variar entre ".concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima));
            if (!errorEntrada) {
                console.log("Monto inv\u00E1lido. Debe ser un numero entre ".concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima));
            }
            montoApuesta = rls.questionInt('Ingrese la apuesta (0: sale): ');
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
}());
exports.Tragamonedas = Tragamonedas;
