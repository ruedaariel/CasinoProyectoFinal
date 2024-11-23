"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var juego2_1 = require("./juego2/juego2");
var juego3_1 = require("./juego3/juego3");
var TragamonedasClasico_1 = require("./tragamonedas/TragamonedasClasico");
var TragamonedasTematico_1 = require("./tragamonedas/TragamonedasTematico");
var Casino = /** @class */ (function () {
    function Casino() {
        this.clientes = [];
        this.tragamonedasClasico = new TragamonedasClasico_1.TragamonedasClasico();
        this.tragamonedasTematico = new TragamonedasTematico_1.TragamonedasTematico();
        this.juego2 = new juego2_1.Juego2();
        this.juego3 = new juego3_1.Juego3();
    }
    /*elegirJuego(nombre: string): Juego | null {
        return this.juegos.find(juego => juego.obtenerNombre() === nombre) || null;
    }*/
    Casino.prototype.listarJuegos = function () {
        var salida = [];
        salida[0] = "".concat(this.tragamonedasClasico.getNombre(), "     Monto m\u00EDnimo de apuesta:").concat(this.tragamonedasClasico.getApuestaMinima());
        salida[1] = "/n ".concat(this.tragamonedasTematico.getNombre(), "     Monto m\u00EDnimo de apuesta:").concat(this.tragamonedasTematico.getApuestaMinima());
        salida[2] = "/n ".concat(this.juego2.getNombre(), "     Monto m\u00EDnimo de apuesta:").concat(this.juego2.getApuestaMinima());
        salida[3] = "/n ".concat(this.juego3.getNombre(), "     Monto m\u00EDnimo de apuesta:").concat(this.juego3.getApuestaMinima());
        return salida;
    };
    return Casino;
}());
exports.Casino = Casino;
