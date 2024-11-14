import { Tragamonedas } from "./Tragamonedas";


export class TragamonedasTematico extends Tragamonedas {
    constructor() {
        super("Tragamonedas Temático", 1000);
    }

    realizarApuesta(valor: number): string {
        if (valor < this.getApuestaMinima()) {
            return "La apuesta es menor al valor mínimo permitido.";
        }
        // Lógica del juego
        const resultado = Math.random() < 0.7 ? "Ganó" : "Perdió";
        return `Resultado: ${resultado}`;
    }
    public pagar():void {};

    public apostar():void {};
}
