import { Cliente } from "../clases/Cliente";

export interface JuegoCasino {
    apostar(Jugador: Cliente): void;
    jugar(): void;
    pagar(): number;
}