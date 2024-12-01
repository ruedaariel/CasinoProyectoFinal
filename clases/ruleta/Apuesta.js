"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apuesta = void 0;
// Tipo de apuesta que un jugador puede realizar
var Apuesta = /** @class */ (function () {
    function Apuesta(tipo, valor, cantidadApostada) {
        // tipo puede ser "numero"  "color" "docena" "parOImpar"
        this.tipo = "";
        this.valor = ""; // El valor depende del tipo de apuesta number, string, string
        this.cantidadApostada = 0; // Cantidad apostada
        this.resultadoApuesta = 0; // alamacena el monto que gano
        this.tipo = tipo;
        this.valor = valor;
        this.cantidadApostada = cantidadApostada;
    }
    Apuesta.prototype.setTipo = function (tipo) {
        this.tipo = tipo;
    };
    Apuesta.prototype.setValor = function (valor) {
        this.valor = valor;
    };
    Apuesta.prototype.setCantidadApostada = function (cantidadApostada) {
        this.cantidadApostada = cantidadApostada;
    };
    Apuesta.prototype.setResultadoApuesta = function (monto) {
        this.resultadoApuesta = monto;
    };
    Apuesta.prototype.getResultadoApuesta = function () {
        return this.resultadoApuesta;
    };
    Apuesta.prototype.getTipo = function () {
        return this.tipo;
    };
    Apuesta.prototype.getValor = function () {
        return this.valor;
    };
    Apuesta.prototype.getCantidadApostada = function () {
        return this.cantidadApostada;
    };
    return Apuesta;
}());
exports.Apuesta = Apuesta;
