"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
var Cliente = /** @class */ (function () {
    function Cliente(dni, nombre) {
        this.dni = dni;
        if (nombre != undefined && nombre != "") {
            this.nombre = nombre.trim();
        }
        else {
            this.nombre = "Anonimo";
        }
        this.credito = 0;
    }
    Cliente.prototype.getDni = function () {
        return this.dni;
    };
    Cliente.prototype.setDni = function (dni) {
        this.dni = dni;
    };
    Cliente.prototype.getNombre = function () {
        return this.nombre;
    };
    Cliente.prototype.setNombre = function (value) {
        if (value != undefined && value.trim() != "") {
            this.nombre = value.trim();
        }
    };
    Cliente.prototype.getACredito = function () {
        return this.credito;
    };
    Cliente.prototype.setCredito = function (value) {
        if (value != undefined && value >= 0) {
            this.credito = value;
        }
    };
    Cliente.prototype.mostrarCliente = function () {
        return ("   Dni: " + this.dni + "   Nombre: " + this.nombre + "    Credito: " + this.credito);
    };
    return Cliente;
}());
exports.Cliente = Cliente;
