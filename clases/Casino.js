"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Casino = void 0;
var TragamonedasClasico_1 = require("./tragamonedas/TragamonedasClasico");
var TragamonedasTematico_1 = require("./tragamonedas/TragamonedasTematico");
var BlackJack_1 = require("./BlackJack2/BlackJack");
var Ruleta_1 = require("./ruleta/Ruleta");
var PaseIngles_1 = require("./Dados/PaseIngles");
var Cliente_1 = require("./Cliente");
var readlineSync = require("readline-sync");
var Funciones = require("../Funciones/funciones");
require("colors");
var fs = require("fs");
var Casino = /** @class */ (function () {
    function Casino() {
        this.clientes = [];
        this.juegos = [];
        this.juegos.push(new TragamonedasClasico_1.TragamonedasClasico());
        this.juegos.push(new TragamonedasTematico_1.TragamonedasTematico());
        this.juegos.push(new BlackJack_1.BlackJack());
        this.juegos.push(new Ruleta_1.Ruleta());
        this.juegos.push(new PaseIngles_1.PaseIngles());
    }
    Casino.prototype.abrirCasino = function () {
        var jugador;
        this.clientes = this.leeDatosCliente("./clases/datos/clientes.txt");
        Funciones.mensajeAlerta("          🃏    BIENVENIDOS al CASINO     🃏          ", "verde");
        var dni = this.ingresarDni();
        var clienteIndex = this.existeDni(dni, this.clientes);
        if (dni !== 0) {
            if (clienteIndex !== -1) {
                Funciones.mensajeAlerta("Cliente encontrado: ", "azul");
                this.clientes[clienteIndex].mostrarCliente();
                jugador = this.clientes[clienteIndex];
            }
            else {
                jugador = this.hacerAltaCliente(dni);
            }
            this.mostrarMenu(jugador);
            this.grabaDatos("./clases/datos/clientes.txt", this.clientes);
        }
    };
    Casino.prototype.ingresarDni = function () {
        var dni;
        var errorEntrada = true;
        do {
            // console.clear();
            Funciones.mensajeAlerta("Por favor, ingrese su DNI:", "azul");
            if (!errorEntrada) {
                Funciones.mensajeAlerta("DNI inválido. Debe ser un número.", "rojo");
            }
            var dniString = readlineSync.question(Funciones.igualoCadena("\n", 31, " ") + "Ingrese el DNI (0 para salir): ".green);
            dni = parseInt(dniString);
            if (isNaN(dni) || dni < 0) {
                errorEntrada = false;
            }
            else {
                errorEntrada = true;
            }
        } while (!errorEntrada);
        console.clear();
        return dni;
    };
    Casino.prototype.existeDni = function (dni, clientes) {
        return clientes.findIndex(function (cliente) { return cliente.getDni() === dni; });
    };
    Casino.prototype.ingresarNombre = function () {
        var nombre;
        var errorEntrada = true;
        var cartel = "Ingrese nombre del Cliente";
        do {
            console.clear();
            Funciones.mensajeAlerta(cartel, "azul");
            if (!errorEntrada) {
                Funciones.mensajeAlerta("Error en el ingreso del nombre", "rojo");
            }
            nombre = readlineSync.question(Funciones.igualoCadena("\n", 31, " ") + "Ingrese el nombre: ".green);
            if (nombre.trim() === "") {
                errorEntrada = false;
            }
            else {
                errorEntrada = true;
            }
        } while (!errorEntrada);
        console.clear();
        return nombre;
    };
    Casino.prototype.hacerAltaCliente = function (dni) {
        var nombre = this.ingresarNombre();
        var nuevoCliente = new Cliente_1.Cliente(dni, nombre);
        this.clientes.push(nuevoCliente);
        return nuevoCliente;
    };
    Casino.prototype.ingresarCredito = function () {
        var creditoCliente;
        var creditoString = "";
        var errorEntrada = true;
        do {
            // console.clear();
            Funciones.mensajeAlerta("Por favor, ingrese el dinero que desea tener a favor :", "azul");
            if (!errorEntrada) {
                Funciones.mensajeAlerta("Monto inválido. Debe ser un número mayor que 0.", "rojo");
            }
            var creditoString_1 = readlineSync.question(Funciones.igualoCadena("\n", 31, " ") +
                "Ingrese el monto (0 para salir): ".green);
            creditoCliente = parseInt(creditoString_1);
            if (isNaN(creditoCliente) || creditoCliente < 0) {
                errorEntrada = false;
            }
            else {
                errorEntrada = true;
            }
        } while (!errorEntrada);
        console.clear();
        return creditoCliente;
    };
    Casino.prototype.cargarCredito = function (jugador) {
        jugador.mostrarCliente();
        if (jugador) {
            var nuevoCredito = this.ingresarCredito();
            if (nuevoCredito != 0) {
                jugador.setCredito(jugador.getACredito() + nuevoCredito);
            }
        }
        else {
            Funciones.mensajeAlerta("No se encontro el cliente", "rojo");
        }
    };
    Casino.prototype.mostrarMenu = function (jugador) {
        var opcion;
        var condicion = "";
        var errorIngreso = true;
        console.clear();
        var servicios = [
            "1. Tragamonedas Clasico",
            "2. Tragamonedas Tematico",
            "3. Blackjack",
            "4. Ruleta",
            "5. Dados",
            "6. Cargar Crédito",
            "7. Listar Cliente",
            "0. Salir",
        ];
        do {
            console.clear();
            Funciones.pantallaMenu("      CASINO ON-LINE ", servicios, 30, 40, 2);
            if (!errorIngreso) {
                Funciones.lineaConRecuadroError(30, "Opción inválida. Por favor, intente nuevamente", 40, 2);
            }
            opcion = readlineSync.question(Funciones.igualoCadena("", 31, " ") +
                "Seleccione una de las opciones:".green);
            condicion = "1";
            console.clear();
            switch (opcion) {
                case "1":
                    Funciones.mensajeAlerta("          🍒    BIENVENIDOS A TRAGAMONEDAS CLASICO    🍒          ", "verde");
                    // console.log("seleccionaste Tragamonedas Clásico");
                    this.leerArchivoInstrucciones("./clases/datos/tragamonedas.txt", "Tragamonedas");
                    this.repetirUnJuego(0, jugador);
                    break;
                case "2":
                    // console.log("seleccionaste Tragamonedas Temático");
                    this.leerArchivoInstrucciones("./clases/datos/tragamonedas.txt", "Tragamonedas");
                    Funciones.mensajeAlerta("          🍀    BIENVENIDOS A TRAGAMONEDAS TEMATICO    🍀          ", "verde");
                    this.repetirUnJuego(1, jugador);
                    break;
                case "3":
                    Funciones.mensajeAlerta("          🃏    BIENVENIDOS A BLACKJACK    🃏          ", "verde");
                    this.leerArchivoInstrucciones("./clases/datos/blackJack.txt", "Blackjack");
                    this.repetirUnJuego(2, jugador); //VER COMO SE INICIA BLACKJACK
                    break;
                case "4":
                    Funciones.mensajeAlerta("              BIENVENIDOS A RULETA              ", "verde");
                    this.leerArchivoInstrucciones("./clases/datos/ruleta.txt", "Ruleta");
                    this.repetirUnJuego(3, jugador);
                    break;
                case "5":
                    Funciones.mensajeAlerta("          🎲    BIENVENIDOS A PASE INGLES    🎲          ", "verde");
                    this.leerArchivoInstrucciones("./clases/datos/paseIngles.txt", "Pase Ingles");
                    this.repetirUnJuego(4, jugador);
                    break;
                case "6":
                    Funciones.mensajeAlerta("          💵    BIENVENIDOS A CARGAR CREDITO    💵          ", "verde");
                    this.cargarCredito(jugador);
                    break;
                case "7":
                    Funciones.mensajeAlerta("              LISTAR CLIENTE              ", "verde");
                    console.log("\n");
                    Funciones.mensajeAlertaSinMarco(jugador.mostrarCliente(), "azul");
                    condicion = readlineSync.question(Funciones.igualoCadena("", 31, " ") +
                        "\n Presione una tecla para continuar ...".green);
                    break;
                case "0":
                    console.log("Saliendo del menú...");
                    break;
                default:
                    errorIngreso = false;
                    console.clear();
                    break;
            }
        } while (opcion !== "0");
    };
    Casino.prototype.repetirUnJuego = function (indice, jugador) {
        var condicion = "1";
        console.clear();
        while (parseInt(condicion) > 0) {
            if (indice == 3) {
                this.juegos[indice].comenzarAJugar(jugador);
            }
            else {
                this.juegos[indice].apostar(jugador);
            }
            condicion = readlineSync.question(Funciones.igualoCadena("\n", 20, " ") +
                " Si desea seguir apostando a ".concat(this.juegos[indice].getNombre(), ", presione un numero mayor a 0:  ").green);
            console.clear();
        }
    };
    Casino.prototype.grabaDatos = function (archivo, datos) {
        // Convertir los datos a JSON
        var datosJSON = JSON.stringify(datos, null, 2);
        // Escribir datos en un archivo .txt
        fs.writeFileSync(archivo, datosJSON, "utf-8");
        //console.log(Archivo ${archivo} creado con éxito.);
    };
    Casino.prototype.leeDatosCliente = function (archivo) {
        // Leer el archivo
        var datos = fs.readFileSync(archivo, "utf-8");
        // Parsear los datos leídos
        var objetosLeidos = JSON.parse(datos);
        var clientes = [];
        // Reconstituir los objetos como instancias de Cliente
        objetosLeidos.forEach(function (objeto) {
            var cliente = new Cliente_1.Cliente(objeto.dni, objeto.nombre);
            cliente.setCredito(objeto.credito);
            clientes.push(cliente);
        });
        return clientes;
    };
    Casino.prototype.leerArchivoInstrucciones = function (ruta, titulo) {
        // VER
        //const ruta = `./instrucciones/${juego.toLowerCase()}.txt`;
        if (fs.existsSync(ruta)) {
            var instrucciones = fs.readFileSync(ruta, "utf-8");
            Funciones.mensajeAlerta("Instrucciones para ".concat(titulo, " "), "azul");
            console.log("\n".concat(instrucciones));
            console.log("\n \n");
            var caracter = readlineSync.question(" Presione una tecla para continuar ...").blue;
            console.log("\n \n");
        }
        else {
            Funciones.mensajeAlerta("\nNo se encontraron instrucciones para ".concat(titulo, "."), "amarillo");
        }
    };
    return Casino;
}());
exports.Casino = Casino;
