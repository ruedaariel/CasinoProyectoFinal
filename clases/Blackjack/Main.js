"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var JugadorImpl_1 = require("./JugadorImpl");
var BlackJack_1 = require("./BlackJack");
var Main = /** @class */ (function () {
    function Main() {
    }
    Main.main = function () {
        // Crear instancias de los jugadores
        var jugador1 = new JugadorImpl_1.JugadorImpl('Alice', 1000);
        var jugador2 = new JugadorImpl_1.JugadorImpl('Bob', 1000);
        // Crear una instancia del juego
        var juego = new BlackJack_1.BlackJack([jugador1, jugador2]);
        // Iniciar el juego
        juego.jugar();
    };
    return Main;
}());
// Ejecutar el juego
Main.main();
