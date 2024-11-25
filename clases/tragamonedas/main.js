"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TragamonedasClasico_1 = require("./TragamonedasClasico");
var Cliente_1 = require("../Cliente");
var rls = require("readline-sync");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.main = function () {
        // Crear instancias de los jugadores
        var jugador1 = new Cliente_1.Cliente(20223444, 'Alice');
        // Crear una instancia del juego
        var juego = new TragamonedasClasico_1.TragamonedasClasico();
        // Iniciar el juego
        jugador1.setCredito(100000);
        var condicion = 1;
        while (condicion > 0) {
            juego.apostar(jugador1);
            condicion = rls.questionInt("Si desea seguir apostando ingrese un número mayor a 0: ");
        }
    };
    return Main;
}());
// Ejecutar el juego
Main.main();
