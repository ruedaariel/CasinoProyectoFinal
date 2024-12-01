"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Juego = void 0;
var funciones = require("../Funciones/funciones");
var rls = require("readline-sync");
var Juego = /** @class */ (function () {
    function Juego() {
        this.nombre = "";
        this.apuestaMinima = 0;
        this.apuestaMaxima = 100000;
    }
    Juego.prototype.getNombre = function () {
        return this.nombre;
    };
    Juego.prototype.setNombre = function (value) {
        if (value != undefined && value.trim() != "") {
            this.nombre = value.trim();
        }
    };
    Juego.prototype.getApuestaMinima = function () {
        return this.apuestaMinima;
    };
    Juego.prototype.setApuestaMinima = function (value) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }
    };
    Juego.prototype.getApuestaMaxima = function () {
        return this.apuestaMinima;
    };
    Juego.prototype.setApuestaMaxima = function (value) {
        if (value != undefined && value > 0) {
            this.apuestaMaxima = value;
        }
    };
    Juego.prototype.verificarCredito = function (jugador) {
        if ((jugador.getACredito() < this.apuestaMinima) || (jugador.getACredito() === 0)) {
            funciones.mensajeAlerta("El Cliente ".concat(jugador.getNombre(), " no dispone de saldo suficiente para apostar"), "rojo");
            funciones.mensajeAlerta("Puede volver al Casino para recargar credito. Muchas Gracias.", "azul");
            var pausa = rls.question((funciones.igualoCadena("", 31, " ") + "Presione una tecla ..."));
            return false;
        }
        return true;
    };
    return Juego;
}());
exports.Juego = Juego;
