"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Cliente_1 = require("./Cliente");
var BlackJack_1 = require("./BlackJack");
var funciones = require("./funciones");
require("colors");
var readlineSync = require("readline-sync");
var MainBJ = /** @class */ (function () {
    function MainBJ() {
    }
    MainBJ.main = function () {
        // Crear instancias de los jugadores
        var jugador1 = new Cliente_1.Cliente(11111, 'Miguel');
        // Crear una instancia del juego
        var juego = new BlackJack_1.BlackJack();
        funciones.mensajeAlerta("Bienvenido a Black Jack ".concat(jugador1.getNombre()), "verde");
        var continuar = readlineSync.question("Presione ENTER para continuar");
        jugador1.setCredito(10000);
        var condicion = 1;
        while (condicion > 0) {
            juego.apostar(jugador1);
            condicion = readlineSync.questionInt("Si desea seguir apostando ingrese un número mayor a 0: ");
        }
    };
    return MainBJ;
}());
// Ejecutar el juego
MainBJ.main();
