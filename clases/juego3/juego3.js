"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Juego3 = void 0;
var Juego3 = /** @class */ (function () {
    function Juego3() {
        this.nombre = "JUEGO3";
        this.apuestaMinima = 0;
        this.pagoMaximo = 0;
    }
    Juego3.prototype.realizarApuesta = function (valor) {
        if (valor < this.apuestaMinima) {
            return "La apuesta es menor al valor mínimo permitido.";
        }
        // Lógica del juego
        var resultado = Math.random() < 0.6 ? "Ganó" : "Perdió";
        return "Resultado: ".concat(resultado);
    };
    Juego3.prototype.getNombre = function () {
        return this.nombre;
    };
    Juego3.prototype.setNombre = function (value) {
        if (value != undefined && value.trim() != "") {
            this.nombre = value.trim();
        }
    };
    Juego3.prototype.getApuestaMinima = function () {
        return this.apuestaMinima;
    };
    Juego3.prototype.setApuestaMinima = function (value) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }
    };
    Juego3.prototype.pagar = function () { };
    ;
    Juego3.prototype.apostar = function (valor) {
        return "Hola";
    };
    Juego3.prototype.jugar = function () { };
    return Juego3;
}());
exports.Juego3 = Juego3;
