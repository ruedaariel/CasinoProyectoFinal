import { JuegoCasino } from "../../interfaz/juegoCasino";

export class Juego3 implements JuegoCasino {
    protected nombre: string = "JUEGO3";
    protected apuestaMinima:number = 0;
    protected pagoMaximo: number = 0;
   

    public realizarApuesta(valor: number): string {
        if (valor < this.apuestaMinima) {
            return "La apuesta es menor al valor mínimo permitido.";
        }
        // Lógica del juego
        const resultado = Math.random() < 0.6 ? "Ganó" : "Perdió";
        return `Resultado: ${resultado}`;
    }

    public getNombre(): string {
        return this.nombre;
    }
    public setNombre(value: string) {
        if (value != undefined && value.trim() != "") {
            this.nombre = value.trim();
        }
    }
    public getApuestaMinima(): number {
        return this.apuestaMinima;
    }
    public setApuestaMinima(value: number) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }

    }
    public pagar():void {};

    public apostar():void {};
}
