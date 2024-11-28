import { Cliente } from "../Cliente";
import * as rls from "readline-sync";
import { Juego } from "../../clases/juego";
import * as funciones from "../../Funciones/funciones"

export abstract class Tragamonedas extends Juego {
    protected temaTambores: string[]; //iconos que componen los tragamonedas
    protected estructuraTambores: string[][]; //cantidad de tambores
    protected comodin: string //icono distintivo que suma mas puntos
    private multiplicador: number; //Se usa en metodo pagar()
    private resultadoJuego: string[] = [] //Se usa en metodo Juego()
    private cantApostada: number = 0 ; //Se usa en Apostar() y Pagar()
  
    constructor(nombre: string, apuestaMinima: number,apuestaMaxima: number, temaTambores: string[], estructuraTambores: string[][], comodin: string, multiplicador: number) {
        super();
        this.setNombre(nombre);
        this.setApuestaMinima(apuestaMinima);
        this.setApuestaMaxima(apuestaMaxima);
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
 
    public apostar(jugador: Cliente): void{ 
        let premio: number = 0; //Variable para asignar monto ganado en la jugada
        funciones.mensajeAlerta(`Tu crédito actual es de ${jugador.getACredito()} pesos`,"Azul");
        this.cantApostada = this.ingresarApuesta();
        if (this.cantApostada > jugador.getACredito()) {
            funciones.mensajeAlerta(`La apuesta debe ser menor o igual a su credito de $ ${jugador.getACredito()}`, "Rojo")
        } else {
            jugador.setCredito(jugador.getACredito()-this.cantApostada);
            funciones.mensajeAlerta(`Apostando ${this.cantApostada} pesos...`,"Azul"); 
            this.jugar();
            premio = this.pagar();
            premio += this.pagoBonus(premio);
            jugador.setCredito(jugador.getACredito()+premio);
            funciones.mensajeAlerta(premio > 0 ? `¡GANASTE UN TOTAL DE ${premio} PESOS!` : `Lo siento, perdiste.`, premio > 0? "Amarillo" : "Azul");
            funciones.mensajeAlerta(`Tu crédito actual es de ${jugador.getACredito()} pesos`,"Rojo");
        }
    }

    public jugar(): void {
        this.resultadoJuego = []; //Vuelvo la rariable a 0 para que no acumule
        for (let i = 0; i < this.estructuraTambores.length; i++) {
            const indice = Math.floor(Math.random() * this.estructuraTambores[i].length);
            this.resultadoJuego.push(this.estructuraTambores[i][indice]);
        }
        funciones.mensajeAlerta(`Resultados: ${this.resultadoJuego.join(" | ")}`,"Amarillo");
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
            funciones.mensajeAlerta(`La apuesta puede variar entre ${this.apuestaMinima} y ${this.apuestaMaxima} pesos`,"Amarillo");
            if (!errorEntrada) {
                funciones.mensajeAlerta(`Monto inválido. Debe ser un numero entre ${this.apuestaMinima} y ${this.apuestaMaxima} pesos`,"Rojo");
            }
            montoApuesta = rls.questionInt(funciones.igualoCadena("", 31, " ") + 'Ingrese la apuesta en pesos (0: sale): '.green);
            if (!this.validarMontoApuesta(montoApuesta)) { 
                errorEntrada = false; 
            }

        } while (!this.validarMontoApuesta(montoApuesta));

        return montoApuesta;
    }
    private validarMontoApuesta(valor: number): boolean {
        return !isNaN(valor) && valor == 0 || valor >= this.apuestaMinima && valor <= this.apuestaMaxima;  
    }
    //este método sirve para que cada tragamonedas pague un bono extra de alguna manera para agregar al premio
    public abstract pagoBonus(premio : number): number;
}
