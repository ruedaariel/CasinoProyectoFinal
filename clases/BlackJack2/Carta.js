"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Carta = void 0;
var Carta = /** @class */ (function () {
    function Carta(valor, palo) {
        this.valor = valor;
        this.palo = palo;
    }
    Carta.prototype.getValor = function () {
        return this.valor;
    };
    Carta.prototype.setValor = function (valor) {
        this.valor = valor;
    };
    Carta.prototype.getPalo = function () {
        return this.palo;
    };
    Carta.prototype.setPalo = function (palo) {
        this.palo = palo;
    };
    return Carta;
}());
exports.Carta = Carta;
