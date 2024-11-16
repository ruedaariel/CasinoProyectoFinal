import { JuegoCasino } from "../../interfaz/juegoCasino";

export abstract class Tragamonedas implements JuegoCasino {
    protected nombre: string;
    protected apuestaMinima: number = 0;
    protected pagoMaximo: number = 0; // que era esto???
    //multiplicador: number; ver si se usa

    constructor(nombre: string, apuestaMinima: number) {
        if (nombre != undefined && nombre != "") {
            this.nombre = nombre.trim();
        } else {
            this.nombre = "Tragamonedas";
        }

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
    public  setApuestaMinima(value: number) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }

    }

    abstract jugar(): void;

    abstract pagar(): void;

    abstract apostar(): void;
}

