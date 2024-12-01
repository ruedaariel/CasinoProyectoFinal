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
exports.TragamonedasClasico = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var funciones = require("../../Funciones/funciones");
var TragamonedasClasico = /** @class */ (function (_super) {
    __extends(TragamonedasClasico, _super);
    function TragamonedasClasico() {
        var _this = _super.call(this, "Tragamonedas Clásico", 500, 10000, ["🍎", "🍌", "🍒", "🍇", "🍉", "🍈", "🥝", "🍐", "🫐"], [[], [], []], "⭐", 5) || this;
        _this.cantDeTiradas = 1; //Sumador de tiradas
        _this.bonusExtras = 3;
        return _this;
    }
    TragamonedasClasico.prototype.pagoBonus = function (premio) {
        funciones.mensajeAlerta("Llevas ".concat(this.cantDeTiradas, " de ").concat(this.bonusExtras, " tiros. EL TERCERO SUMA AL PREMIO!!!"), "Rojo");
        // Lógica para aplicar los bonos extras
        var bonusGanado = 0;
        if (this.cantDeTiradas > 2) {
            this.cantDeTiradas = 1;
            // El bono otorga un porcentaje adicional al premio
            var porcentajeBono = Math.random() * 0.5; // Bono entre 0% y 50% de la apuesta
            bonusGanado = premio * porcentajeBono;
            if (bonusGanado > 0) {
                funciones.mensajeAlerta("GANASTE UN BONUS DEL  ".concat((porcentajeBono * 100).toFixed(0), "% SOBRE TU PREMIO!!!!"), "Amarillo");
                funciones.mensajeAlerta("MONTO DEL BONUS $ ".concat(bonusGanado.toFixed(0), " !!!!"), "Amarillo");
            }
        }
        else {
            this.cantDeTiradas += 1;
        }
        return Math.floor(bonusGanado);
    };
    return TragamonedasClasico;
}(Tragamonedas_1.Tragamonedas));
exports.TragamonedasClasico = TragamonedasClasico;
