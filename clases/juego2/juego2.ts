import { JuegoCasino } from "../../interfaz/juegoCasino";

export class Juego2 implements JuegoCasino {
    private nombre: string = "RULETA";
    
    private apuestaMinima: number = 0;
   
    protected pagoMaximo: number = 0;
  
    realizarApuesta(valor: number): string {
        if (valor < this.apuestaMinima) {
            return "La apuesta es menor al valor mínimo permitido.";
        }
        // Lógica del juego
        const resultado = Math.random() < 0.4 ? "Ganó" : "Perdió";
        return `Resultado: ${resultado}`;
    }

    getNombre(): string {
        return this.nombre;
    }
    setNombre(value: string) {
        if (value != undefined && value.trim() != "") {
            this.nombre = value.trim();
        }
    }
    getApuestaMinima(): number {
        return this.apuestaMinima;
    }
    protected setApuestaMinima(value: number) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }

    }
    public pagar():void {};

    public apostar():void {};
}
