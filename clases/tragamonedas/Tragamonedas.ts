import { Console } from "console";
import { JuegoCasino } from "../../interfaz/juegoCasino";

export abstract class Tragamonedas implements JuegoCasino {
    protected nombre: string; //Nombre el tragamonedas
    protected apuestaMinima: number = 0; //apusta mínima del tragamonedas
    protected temaTambores: string[]; //iconos que componen los tragamonedas
    protected estructuraTambores: string[][]; //cantidad de tambores
    protected comodin: string //icono distintivo que suma mas puntos
    protected pagoMaximo: number = 0; //Pago máximo del tragamonedas
    private multiplicador: number; //Se usa en metodo pagar()
    private resultadoJuego: string[] = [] //Se usa en metodo Juego()
    private cantApostada: number; //Se usa en Apostar() y Pagar()
    private premio: number; //Se usa en Apostar() y Pagar()

    constructor(nombre: string, apuestaMinima: number,temaTambores: string[], estructuraTambores: string[][], comodin: string, multiplicador: number) {
        if (nombre != undefined && nombre != "") {
            this.nombre = nombre.trim();
        } else {
            this.nombre = "Tragamonedas";
        }
        this.apuestaMinima = apuestaMinima;
        this.temaTambores = temaTambores;
        this.estructuraTambores = estructuraTambores; 
        this.comodin = comodin;
        this.multiplicador = multiplicador;
        this.setInicializarTambores(); 
    }
    
    setInicializarTambores(): void { 
        for (let i = 0; i < this.estructuraTambores.length; i++) { 
            this.estructuraTambores[i] = [...this.temaTambores, this.comodin]; 
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
    public setApuestaMinima(value: number) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }
    }
    public apostar(jugador: Cliente): void{ 
        this.cantApostada = cantidadApostada;
        if (this.cantApostada < this.getApuestaMinima()) {
            console.log(`La apuesta debe ser mayor a ${this.apuestaMinima}`);
        } else {
            console.log(`Apostando ${this.cantApostada} pesos...`); 
            this.jugar();
            this.pagar();
            console.log(this.premio > 0 ? `¡Ganaste ${this.premio} pesos!` : `Lo siento, perdiste.`);
        }
    }

    public jugar(): void {
        for (let i = 0; i < this.estructuraTambores.length; i++) {
            const indice = Math.floor(Math.random() * this.estructuraTambores[i].length);
            this.resultadoJuego.push(this.estructuraTambores[i][indice]);
        }
        console.log(`Resultados: ${this.resultadoJuego.join(" | ")}`);
    }

    public pagar(): void {
        const conteo: { [key: string]: number } = {};

        for (const resultado of this.resultadoJuego) {
            if (conteo[resultado]) {
                conteo[resultado]++;
            } else {
                conteo[resultado] = 1;
            }
        }

        this.premio = 0;
        if (conteo[this.comodin]) {
            this.premio = this.cantApostada * this.multiplicador;
        } else {
            for (const key in conteo) {
                if (conteo[key] >= 2) {
                    this.premio = this.cantApostada * conteo[key];
                }
            }
        }
    }
}

