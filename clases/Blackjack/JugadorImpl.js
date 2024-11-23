"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JugadorImpl = void 0;
var JugadorImpl = /** @class */ (function () {
    function JugadorImpl(nombre, saldo) {
        this.mano = [];
        this.apuestaActual = 0;
        this.nombre = nombre;
        this.saldo = saldo;
    }
    JugadorImpl.prototype.apostar = function (cantidad) {
        if (cantidad > this.saldo) {
            console.log("".concat(this.nombre, " no tiene suficiente saldo para apostar ").concat(cantidad, "."));
        }
        else {
            this.saldo -= cantidad;
            this.apuestaActual += cantidad;
            console.log("".concat(this.nombre, " ha apostado ").concat(cantidad, ". Saldo restante: ").concat(this.saldo, "."));
        }
    };
    JugadorImpl.prototype.ganar = function (cantidad) {
        this.saldo += cantidad;
        console.log("".concat(this.nombre, " ha ganado ").concat(cantidad, ". Saldo total: ").concat(this.saldo, "."));
    };
    return JugadorImpl;
}());
exports.JugadorImpl = JugadorImpl;
