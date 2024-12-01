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
exports.TragamonedasTematico = void 0;
var Tragamonedas_1 = require("./Tragamonedas");
var funciones = require("../../Funciones/funciones");
var TragamonedasTematico = /** @class */ (function (_super) {
    __extends(TragamonedasTematico, _super);
    function TragamonedasTematico() {
        var _this = _super.call(this, "Tragamonedas Temático", 10000, 1000000, ["🐵", "🐶", "🐺", "🦊", "🦝", "🐱", "🦁", "🐯", "🐷", "🐮", "🐭", "🐰", "🐹", "🐧", "🐻", "🦉"], [[], [], [], [], []], "👑", 2) || this;
        _this.mediaParaBonusExtras = 10;
        return _this;
    }
    TragamonedasTematico.prototype.pagoBonus = function (premio) {
        // Lógica para aplicar los bonos extras
        var bonusGanado = 0;
        var mediaBono = Math.random() * this.mediaParaBonusExtras;
        //Para que no entre muy seguido a dar un 50 % de premio divido por 1.2
        if (mediaBono > this.mediaParaBonusExtras / 1.2) {
            // El bono otorga un porcentaje adicional del 50 % al premio
            bonusGanado = premio * 0.5;
            if (bonusGanado > 0) {
                funciones.mensajeAlerta("GANASTE UN BONUS DE 50 % DE $ ".concat(bonusGanado.toFixed(0)), "Amarillo");
            }
        }
        return Math.floor(bonusGanado);
    };
    return TragamonedasTematico;
}(Tragamonedas_1.Tragamonedas));
exports.TragamonedasTematico = TragamonedasTematico;
