import { Tragamonedas } from "./Tragamonedas";


export class TragamonedasClasico extends Tragamonedas {

    constructor() {
        super("Tragamonedas Clásico", 500);
    }

    realizarApuesta(valor: number): string {
        if (valor < this.getApuestaMinima()) {
            return "La apuesta es menor al valor mínimo permitido.";
        }
        // Lógica del juego
        const resultado = Math.random() < 0.5 ? "Ganó" : "Perdió";
        return `Resultado: ${resultado}`;
    }
    public pagar():void {};

    public apostar():void {};
}
