"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlackJack = void 0;
//import * as funciones from "../../Funciones/funciones";
require("colors");
var Carta_1 = require("./Carta");
var readlineSync = require("readline-sync");
var juego_1 = require("../juego");
var funciones = require("../../Funciones/funciones");
var BlackJack = /** @class */ (function (_super) {
    __extends(BlackJack, _super);
    function BlackJack() {
        var _this = _super.call(this) || this;
        _this.baraja = [];
        _this.mano = [];
        _this.crupier = [];
        _this.apuestaActual = 0;
        _this.setNombre("BLACK JACK");
        _this.setApuestaMinima(1000);
        _this.setApuestaMaxima(10000);
        _this.inicializarBaraja();
        return _this;
    }
    //-----------------------------------------------------------------------------------------------------
    BlackJack.prototype.getApuestaActual = function () {
        return this.apuestaActual;
    };
    BlackJack.prototype.setApuestaActual = function (apuestaActual) {
        this.apuestaActual = apuestaActual;
    };
    //----------------------------------------------------------------------------------------------------------
    /*public apostar(jugador:Cliente):void {
      let premio:number=0;
      this.apuestaActual = this.ingresarApuesta();
      if (this.apuestaActual >= jugador.getACredito()) {
             funciones.mensajeAlerta(`La apuesta debe serdir
               menor o igual a su credito de $ ${jugador.getACredito()}`, "Rojo")
      } else {
              jugador.setCredito(jugador.getACredito()-this.apuestaActual);
              //funciones.mensajeAlerta(`Tu crédito actual es de ${jugador.getACredito()}`,"Rojo");
              funciones.mensajeAlerta(`Apostando ${this.apuestaActual} pesos...`,"Azul");
              this.jugar();
              premio = this.pagar();
              jugador.setCredito(jugador.getACredito()+premio);
              funciones.mensajeAlerta(premio > 0 ? `¡Ganaste ${this.apuestaActual} pesos!` : `Lo siento, perdiste.`, premio > 0? "Rojo" : "Azul");
              funciones.mensajeAlerta(`Tu crédito actual es de ${jugador.getACredito()}`,"Rojo");
           }
      }*/
    BlackJack.prototype.apostar = function (jugador) {
        var premio = 0; //Variable para asignar monto ganado en la jugada
        this.apuestaActual = funciones.validarValidezApuesta("Realice su apuesta comprendida entre $ ".concat(this.apuestaMinima, " y $ ").concat(this.apuestaMaxima, " "), this.apuestaMinima, this.apuestaMaxima, jugador.getACredito());
        jugador.setCredito(jugador.getACredito() - this.apuestaActual);
        this.jugar();
        premio = this.pagar();
        jugador.setCredito(jugador.getACredito() + premio);
        funciones.mensajeAlerta(premio > 0 ? "\u00A1GANASTE UN TOTAL DE ".concat(premio, " PESOS!") : "Lo siento, perdiste.", premio > 0 ? "Amarillo" : "Azul");
        funciones.mensajeAlerta("Tu cr\u00E9dito actual es de ".concat(jugador.getACredito(), " pesos"), "Rojo");
    };
    //-------------------------------------------------------------------------------------------------------------- 
    BlackJack.prototype.inicializarBaraja = function () {
        var palos = ['❤️  CORAZONES', ' 🔶  DIAMANTES', ' ♣️ TRÉBOLES', '♠ PICAS'];
        var valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        this.baraja = [];
        for (var _i = 0, palos_1 = palos; _i < palos_1.length; _i++) {
            var palo = palos_1[_i];
            for (var _a = 0, valores_1 = valores; _a < valores_1.length; _a++) {
                var valor = valores_1[_a];
                this.baraja.push(new Carta_1.Carta(valor, palo));
            }
        }
    };
    //-------------------------------------------------------------------------------------------------------
    BlackJack.prototype.barajar = function () {
        var _a;
        for (var i = this.baraja.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            _a = [this.baraja[j], this.baraja[i]], this.baraja[i] = _a[0], this.baraja[j] = _a[1];
        }
    };
    //repartimos 2 cartas para jugador y 2 para crupier 
    BlackJack.prototype.repartir = function () {
        this.mano = [this.baraja.pop(), this.baraja.pop()];
        this.crupier = [this.baraja.pop(), this.baraja.pop()];
    };
    BlackJack.prototype.jugar = function () {
        this.barajar();
        this.repartir();
        // El jugador pedirá otra carta mientras la suma es menor a 17
        while (this.decisionDelJugador()) {
            if (this.baraja.length > 0) {
                this.mano.push(this.baraja.pop());
            }
            else {
                funciones.mensajeAlerta("Baraja vacía", "Rojo");
                break;
            }
        }
        // El Crupier se dará otra carta mientras la suma es menor a 17
        while (this.decisionDelCrupier()) {
            if (this.baraja.length > 0) {
                this.crupier.push(this.baraja.pop());
            }
            else {
                funciones.mensajeAlerta("Baraja vacía", "Rojo");
                break;
            }
        }
    };
    BlackJack.prototype.decisionDelJugador = function () {
        // Calcula el valor total de la mano del jugador
        var valorMano = this.calcularValorMano(this.mano);
        // Retorna verdadero si la suma es menor a 17
        if (valorMano < 17) {
            return true;
        }
        else {
            return false;
        }
    };
    BlackJack.prototype.decisionDelCrupier = function () {
        // Calcula el valor total de la mano del crupier
        var valorMano = this.calcularValorMano(this.crupier);
        // Retoorna verdadero si la suma es menor a 17
        if (valorMano < 17) {
            return true;
        }
        else {
            return false;
        }
    };
    // acumula el valor de la mano deacuerdo al valor de la baraja
    BlackJack.prototype.calcularValorMano = function (ManoCrupier) {
        var valor = 0;
        for (var _i = 0, ManoCrupier_1 = ManoCrupier; _i < ManoCrupier_1.length; _i++) {
            var carta = ManoCrupier_1[_i];
            if (carta.getValor() === 'A') {
                valor += 11;
            }
            else {
                if (carta.getValor() === 'J' || carta.getValor() === 'Q' || carta.getValor() === 'K') {
                    valor += 10;
                }
                else {
                    valor += parseInt(carta.getValor());
                }
            }
        }
        return valor;
    };
    //-----------------------------------------------------------------------------------------------------
    BlackJack.prototype.determinarGanador = function () {
        var valorMano = this.calcularValorMano(this.mano);
        var valorCrupier = this.calcularValorMano(this.crupier);
        funciones.mensajeAlerta("CARTAS DEL JUGADOR", "Rojo");
        for (var _i = 0, _a = this.mano; _i < _a.length; _i++) {
            var carta = _a[_i];
            console.log("                                               ", carta.getValor(), " ", carta.getPalo());
        }
        console.log("----------------------------------------------------------------------------------------------");
        funciones.mensajeAlerta("CARTAS DEL CRUPIER", "Rojo");
        for (var _b = 0, _c = this.crupier; _b < _c.length; _b++) {
            var carta = _c[_b];
            console.log("                                             ", carta.getValor(), " ", carta.getPalo());
        }
        console.log("----------------------------------------------------------------------------------------------");
        if (valorMano > valorCrupier && valorMano <= 21) {
            funciones.mensajeAlerta("EL JUGADOR GANA", "Rojo");
            return true;
        }
        else {
            funciones.mensajeAlerta("CRUPIER GANA", "Rojo");
            return false;
        }
    };
    //------------------------------------------------------------------------------------------------------------
    BlackJack.prototype.pagar = function () {
        if (this.determinarGanador()) {
            return this.apuestaActual * 2;
        }
        return 0;
    };
    //-------------------------------------------------------------------------------------------------------
    BlackJack.prototype.ingresarApuesta = function () {
        var montoApuesta = 0;
        var errorEntrada = true;
        do {
            console.clear();
            funciones.mensajeAlerta("La apuesta puede variar entre ".concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima), "Amarillo");
            if (!errorEntrada) {
                funciones.mensajeAlerta("Monto inv\u00E1lido. Debe ser un numero entre ".concat(this.apuestaMinima, " y ").concat(this.apuestaMaxima), "Rojo");
            }
            montoApuesta = readlineSync.questionInt(funciones.igualoCadena("", 31, " ") + 'Ingrese la apuesta: '.green);
            if (!this.validarMontoApuesta(montoApuesta)) {
                errorEntrada = false;
            }
        } while (!this.validarMontoApuesta(montoApuesta));
        return montoApuesta;
    };
    //-------------------------------------------------------------------------------------------------
    BlackJack.prototype.validarMontoApuesta = function (valor) {
        return !isNaN(valor) && valor == 0 || valor >= this.apuestaMinima && valor <= this.apuestaMaxima;
    };
    return BlackJack;
}(juego_1.Juego));
exports.BlackJack = BlackJack;
