export interface Jugador {
    nombre: string;
    mano: Carta[];
    apostar(cantidad: number): void;
    ganar(cantidad: number): void;
  }
  
  export interface Carta {
    valor: string;
    palo: string;
  }
  
  export interface Juego {
    jugadores: Jugador[];
    barajar(): void;
    repartir(): void;
    jugar(): void;
  }
  