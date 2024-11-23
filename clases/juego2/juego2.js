"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Juego2 = void 0;
var Juego2 = /** @class */ (function () {
    function Juego2() {
        this.nombre = "RULETA";
        this.apuestaMinima = 0;
        this.pagoMaximo = 0;
    }
    Juego2.prototype.realizarApuesta = function (valor) {
        if (valor < this.apuestaMinima) {
            return "La apuesta es menor al valor mínimo permitido.";
        }
        // Lógica del juego
        var resultado = Math.random() < 0.4 ? "Ganó" : "Perdió";
        return "Resultado: ".concat(resultado);
    };
    Juego2.prototype.getNombre = function () {
        return this.nombre;
    };
    Juego2.prototype.setNombre = function (value) {
        if (value != undefined && value.trim() != "") {
            this.nombre = value.trim();
        }
    };
    Juego2.prototype.getApuestaMinima = function () {
        return this.apuestaMinima;
    };
    Juego2.prototype.setApuestaMinima = function (value) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }
    };
    Juego2.prototype.pagar = function () { };
    ;
    Juego2.prototype.apostar = function (valor) {
        return "Hola";
    };
    Juego2.prototype.jugar = function () { };
    return Juego2;
}());
exports.Juego2 = Juego2;
