"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rls = require("readline-sync");
var fs = require("fs");
var Casino_1 = require("./clases/Casino");
var TragamonedasClasico_1 = require("./clases/tragamonedas/TragamonedasClasico");
function mostrarMenu() {
    console.log("\nBienvenido al Casino");
    console.log("1. Listar Juegos");
    console.log("2. Elegir Juego");
    console.log("3. Cargar Credito");
    console.log("3. Salir");
}
function leerArchivoInstrucciones(juego) {
    // VER 
    var ruta = "./instrucciones/".concat(juego.toLowerCase(), ".txt");
    if (fs.existsSync(ruta)) {
        var instrucciones = fs.readFileSync(ruta, 'utf-8');
        console.log("\nInstrucciones para ".concat(juego, ":\n").concat(instrucciones));
    }
    else {
        console.log("\nNo se encontraron instrucciones para ".concat(juego, "."));
    }
}
function realizarApuesta() {
    /* en observacion, vemos cuando y donde */
    var apuesta = rls.questionInt("Ingrese el valor de su apuesta: ");
    //validar apuesta
    //  ver como hacemos bien la apuesta
}
function elegirOpcion() {
    var opcion = rls.questionInt("\nSeleccione una opción: ");
    switch (opcion) {
        case 1: //listar
            console.log("\nJuegos disponibles:");
            casino.listarJuegos().forEach(function (juego, index) {
                console.log("".concat(index + 1, ". ").concat(juego));
            });
            break;
        case 2: //Jugar
            var nombre = rls.question("Ingrese el nombre del juego: ");
            var TragamonedasClasico1 = new TragamonedasClasico_1.TragamonedasClasico();
            TragamonedasClasico1.apostar(1000);
            /* ACA TENEMOS QUE VER BIEN COMO DFINIMOS LOS JUEGOS, SI ES CON UN ARREGLO, O QUE HACEMOS
            const juego = casino.elegirJuego(nombre);
            if (juego) {
                console.log(`\nHas elegido jugar a ${juego.obtenerNombre()}`);
                leerArchivoInstrucciones(juego.obtenerNombre());
                realizarApuesta(juego);
            } else {
                console.log("\nJuego no encontrado.");

            }*/
            break;
        case 3:
            //metodo para cargar el credito del cliente
            break;
        case 4:
            console.log("Gracias por jugar. ¡Hasta pronto!");
            return 4;
        default:
            console.log("Opción inválida. Intente nuevamente.");
            break;
    }
    return opcion;
}
var casino = new Casino_1.Casino();
var op = 3;
// Ingresar el cliente ???
do {
    mostrarMenu();
    op = elegirOpcion();
} while (op == 4);
