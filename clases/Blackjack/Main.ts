import { JugadorImpl } from './JugadorImpl';
import { BlackJack } from './BlackJack';

class Main {
  static main() {
    // Crear instancias de los jugadores
    const jugador1 = new JugadorImpl('Alice', 1000);
    const jugador2 = new JugadorImpl('Bob', 1000);

    // Crear una instancia del juego
    const juego = new BlackJack([jugador1, jugador2]);

    // Iniciar el juego
    juego.jugar();
  }
}

// Ejecutar el juego

Main.main();
