import { TragamonedasClasico } from "./TragamonedasClasico";
import { TragamonedasTematico } from "./TragamonedasTematico";
import { Cliente } from "../Cliente";
import * as rls from "readline-sync";
class Main {
  static main() {
    // Crear instancias de los jugadores
    const jugador1 = new Cliente(20223444, 'Alice');
    

    // Crear una instancia del juego
    const juego = new TragamonedasClasico();

    // Iniciar el juego
    jugador1.setCredito(100000);
    let condicion: number = 1;
    while (condicion>0) {
        juego.apostar(jugador1);
        condicion = rls.questionInt("Si desea seguir apostando ingrese un número mayor a 0: ")
    }
    
  }
}

// Ejecutar el juego

Main.main();
