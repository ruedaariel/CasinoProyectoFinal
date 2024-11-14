
import * as rls from "readline-sync";
import * as fs from 'fs';
import { Casino } from './clases/Casino';




function mostrarMenu() {
    console.log("\nBienvenido al Casino");
    console.log("1. Listar Juegos");
    console.log("2. Elegir Juego");
    console.log("3. Cargar Credito");
    console.log("3. Salir");
}

function leerArchivoInstrucciones(juego: string) {
    // VER 
    const ruta = `./instrucciones/${juego.toLowerCase()}.txt`;
    if (fs.existsSync(ruta)) {
        const instrucciones = fs.readFileSync(ruta, 'utf-8');
        console.log(`\nInstrucciones para ${juego}:\n${instrucciones}`);
    } else {
        console.log(`\nNo se encontraron instrucciones para ${juego}.`);
    }
}

function realizarApuesta() {
/* en observacion, vemos cuando y donde */
    let apuesta: number = rls.questionInt("Ingrese el valor de su apuesta: ");
    //validar apuesta

  //  ver como hacemos bien la apuesta
    
    
}

function elegirOpcion(): number {
    let opcion: number = rls.questionInt("\nSeleccione una opción: ");

    switch (opcion) {
        case 1:  //listar
            console.log("\nJuegos disponibles:");
            casino.listarJuegos().forEach((juego, index) => {
                console.log(`${index + 1}. ${juego}`);
            });
            break;
        case 2: //Jugar
            let nombre: string = rls.question("Ingrese el nombre del juego: ");
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

const casino: Casino = new Casino();
let op: number = 3;
// Ingresar el cliente ???
do {
    mostrarMenu();
    op = elegirOpcion();
} while (op == 4)

