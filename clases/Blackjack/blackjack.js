"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackJack = void 0;
var BlackJack = /** @class */ (function () {
    function BlackJack(jugadores) {
        this.jugadores = [];
        this.baraja = [];
        this.jugadores = jugadores;
        this.inicializarBaraja();
    }
    BlackJack.prototype.inicializarBaraja = function () {
        var palos = ['Corazones', 'Diamantes', 'Tréboles', 'Picas'];
        var valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        for (var _i = 0, palos_1 = palos; _i < palos_1.length; _i++) {
            var palo = palos_1[_i];
            for (var _a = 0, valores_1 = valores; _a < valores_1.length; _a++) {
                var valor = valores_1[_a];
                this.baraja.push({ valor: valor, palo: palo });
            }
        }
    };
    BlackJack.prototype.barajar = function () {
        var _a;
        for (var i = this.baraja.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.baraja[j], this.baraja[i]], this.baraja[i] = _a[0], this.baraja[j] = _a[1];
        }
    };
    BlackJack.prototype.repartir = function () {
        for (var _i = 0, _a = this.jugadores; _i < _a.length; _i++) {
            var jugador = _a[_i];
            jugador.mano = [this.baraja.pop(), this.baraja.pop()];
        }
    };
    BlackJack.prototype.jugar = function () {
        this.barajar();
        this.repartir();
        // Lógica del juego
        for (var _i = 0, _a = this.jugadores; _i < _a.length; _i++) {
            var jugador = _a[_i];
            // Ejemplo de lógica para que el jugador decida si quiere otra carta
            while (this.decisionDelJugador(jugador)) {
                if (this.baraja.length > 0) {
                    jugador.mano.push(this.baraja.pop());
                }
                else {
                    console.log("Baraja vacia");
                    break;
                }
            }
        }
        // Determinar el ganador
        this.determinarGanador();
    };
    BlackJack.prototype.decisionDelJugador = function (jugador) {
        // Calcula el valor total de la mano del jugador
        var valorMano = this.calcularValorMano(jugador.mano);
        // Estrategia simple: pedir carta si el valor de la mano es menor a 17
        if (valorMano < 17) {
            return true;
        }
        else {
            return false;
        }
    };
    BlackJack.prototype.calcularValorMano = function (mano) {
        var valor = 0;
        var ases = 0;
        for (var _i = 0, mano_1 = mano; _i < mano_1.length; _i++) {
            var carta = mano_1[_i];
            if (carta.valor === 'A') {
                ases++;
                valor += 11;
            }
            else if (['K', 'Q', 'J'].includes(carta.valor)) {
                valor += 10;
            }
            else {
                valor += parseInt(carta.valor);
            }
        }
        // Ajusta el valor de los ases si el total es mayor a 21
        while (valor > 21 && ases > 0) {
            valor -= 10;
            ases--;
        }
        return valor;
    };
    BlackJack.prototype.determinarGanador = function () {
        var mejorMano = 0;
        var ganador = null;
        for (var _i = 0, _a = this.jugadores; _i < _a.length; _i++) {
            var jugador = _a[_i];
            var valorMano = this.calcularValorMano(jugador.mano);
            if (valorMano > mejorMano && valorMano <= 21) {
                mejorMano = valorMano;
                ganador = jugador;
            }
        }
        if (ganador) {
            console.log("El ganador es ".concat(ganador.nombre, " con una mano de ").concat(mejorMano, " puntos."));
        }
        else {
            console.log("No hay ganador, todos los jugadores se pasaron de 21.");
        }
    };
    return BlackJack;
}());
exports.BlackJack = BlackJack;
