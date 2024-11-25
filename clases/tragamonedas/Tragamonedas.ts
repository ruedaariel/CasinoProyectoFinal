import { JuegoCasino } from "../../interfaz/juegoCasino";
import { Cliente } from "../Cliente";
import * as rls from "readline-sync";

export abstract class Tragamonedas implements JuegoCasino {
    protected nombre: string; //Nombre el tragamonedas
    protected apuestaMinima: number = 0; //apuesta mínima del tragamonedas
    protected temaTambores: string[]; //iconos que componen los tragamonedas
    protected estructuraTambores: string[][]; //cantidad de tambores
    protected comodin: string //icono distintivo que suma mas puntos
    protected apuestaMaxima: number = 0; //Pago máximo del tragamonedas
    private multiplicador: number; //Se usa en metodo pagar()
    private resultadoJuego: string[] = [] //Se usa en metodo Juego()
    private cantApostada: number; //Se usa en Apostar() y Pagar()
  
    constructor(nombre: string, apuestaMinima: number,apuestaMaxima: number, temaTambores: string[], estructuraTambores: string[][], comodin: string, multiplicador: number) {
        if (nombre != undefined && nombre != "") {
            this.nombre = nombre.trim();
        } else {
            this.nombre = "Tragamonedas";
        }
        this.apuestaMinima = apuestaMinima;
        this.apuestaMaxima = apuestaMaxima
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
    public getApuestaMaxima(): number {
        return this.apuestaMinima;
    }
    public setApuestaMaxima(value: number) {
        if (value != undefined && value > 0) {
            this.apuestaMinima = value;
        }
    }

    public apostar(jugador: Cliente): void{ 
        let premio: number = 0; //Variable para asignar monto ganado en la jugada
        this.cantApostada = this.ingresarApuesta();
        if (this.cantApostada >= jugador.getACredito()) {
            console.log(`La apuesta debe ser menor o igual a su credito de $ ${jugador.getACredito()}`);
        } else {
            jugador.setCredito(jugador.getACredito()-this.cantApostada);
            console.log(`Tu crédito actual es de ${jugador.getACredito()}`)
            console.log(`Apostando ${this.cantApostada} pesos...`); 
            this.jugar();
            premio = this.pagar();
            jugador.setCredito(jugador.getACredito()+premio);
            console.log(premio > 0 ? `¡Ganaste ${premio} pesos!` : `Lo siento, perdiste.`);
            console.log(`Tu crédito actual es de ${jugador.getACredito()}`)
        }
    }

    public jugar(): void {
        this.resultadoJuego = []; //Vuelvo la rariable a 0 para que no acumule
        for (let i = 0; i < this.estructuraTambores.length; i++) {
            const indice = Math.floor(Math.random() * this.estructuraTambores[i].length);
            this.resultadoJuego.push(this.estructuraTambores[i][indice]);
        }
        console.log(`Resultados: ${this.resultadoJuego.join(" | ")}`);
    }

    public pagar(): number {
        let premio: number;
        const conteo: { [key: string]: number } = {};

        for (const resultado of this.resultadoJuego) {
            if (conteo[resultado]) {
                conteo[resultado]++;
            } else {
                conteo[resultado] = 1;
            }
        }

        premio = 0;
        if (conteo[this.comodin]) {
            premio = this.cantApostada * this.multiplicador;
        } else {
            for (const key in conteo) {
                if (conteo[key] >= 2) {
                    premio = this.cantApostada * conteo[key];
                }
            }
        }
    return premio;
    }
    public ingresarApuesta(): number {
        let montoApuesta: number = 0;
        let errorEntrada: boolean = true;

        do {
            console.clear();
            console.log(`La apuesta puede variar entre ${this.apuestaMinima} y ${this.apuestaMaxima}`);
            if (!errorEntrada) {
                console.log(`Monto inválido. Debe ser un numero entre ${this.apuestaMinima} y ${this.apuestaMaxima}`);
            }
            montoApuesta = rls.questionInt('Ingrese la apuesta (0: sale): ');
            if (!this.validarMontoApuesta(montoApuesta)) { 
                errorEntrada = false; 
            }

        } while (!this.validarMontoApuesta(montoApuesta));

        return montoApuesta;
    }
    private validarMontoApuesta(valor: number): boolean {
        return !isNaN(valor) && valor == 0 || valor >= this.apuestaMinima && valor <= this.apuestaMaxima;  
    }
}
