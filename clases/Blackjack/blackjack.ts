import { Jugador, Carta, Juego } from './interfaces';

export class BlackJack implements Juego {
  jugadores: Jugador[] = [];
  baraja: Carta[] = [];

  constructor(jugadores: Jugador[]) {
    this.jugadores = jugadores;
    this.inicializarBaraja();
  }

  inicializarBaraja() {
    const palos = ['Corazones', 'Diamantes', 'Tréboles', 'Picas'];
    const valores = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
    for (const palo of palos) {
      for (const valor of valores) {
        this.baraja.push({ valor, palo });
      }
    }
  }

  barajar() {
    for (let i = this.baraja.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.baraja[i], this.baraja[j]] = [this.baraja[j], this.baraja[i]];
    }
  }
   
  repartir() {
    for (const jugador of this.jugadores) {
      jugador.mano =[this.baraja.pop() as Carta,this.baraja.pop() as Carta];
    }
  }
  
  jugar() {
    this.barajar();
    this.repartir();
    // Lógica del juego
    for (const jugador of this.jugadores) {
      // Ejemplo de lógica para que el jugador decida si quiere otra carta
      while (this.decisionDelJugador(jugador)) {
        if (this.baraja.length > 0) {
              jugador.mano.push(this.baraja.pop() as Carta); }
        else { 
              console.log("Baraja vacia");
              break;
        }      
      }
    }
  
    // Determinar el ganador
    this.determinarGanador();
  }
  
  
  decisionDelJugador(jugador: Jugador): boolean {
    // Calcula el valor total de la mano del jugador
    const valorMano = this.calcularValorMano(jugador.mano);
  
    // Estrategia simple: pedir carta si el valor de la mano es menor a 17
    if (valorMano < 17) {
      return true;
    } else {
      return false;
    }
  }
  
  calcularValorMano(mano: Carta[]): number {
    let valor = 0;
    let ases = 0;
  
    for (const carta of mano) {
      if (carta.valor === 'A') {
        ases++;
        valor += 11;
      } else if (['K', 'Q', 'J'].includes(carta.valor)) {
        valor += 10;
      } else {
        valor += parseInt(carta.valor);
      }
    }
  
    // Ajusta el valor de los ases si el total es mayor a 21
    while (valor > 21 && ases > 0) {
      valor -= 10;
      ases--;
    }  
    return valor;
  }
  
    determinarGanador() {
    let mejorMano = 0;
    let ganador: Jugador | null = null;
  
    for (const jugador of this.jugadores) {
      const valorMano = this.calcularValorMano(jugador.mano);
  
      if (valorMano > mejorMano && valorMano <= 21) {
        mejorMano = valorMano;
        ganador = jugador;
      }
    }
  
    if (ganador) {
      console.log(`El ganador es ${ganador.nombre} con una mano de ${mejorMano} puntos.`);
    } else {
      console.log("No hay ganador, todos los jugadores se pasaron de 21.");
    }
  }
   
}
