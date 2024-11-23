import { JuegoCasino } from "../../interfaz/juegoCasino";
import { Cliente } from "../Cliente";
import * as funciones from "../../Funciones/funciones";
import * as rls from "readline-sync";

export class PaseIngles implements JuegoCasino{
    private dado1: number = 0;
    private dado2: number = 0;
    private punto: number = 0;
    private apuesta: number = 0; //monto de la apuesta
    private gano: boolean = false;
    private apuestaMinima: number = 1000;
    private apuestaMaxima: number = 1000000;

    
    public getGano(): boolean {
        return this.gano;
    }

    private tirarDados(): void {
        this.dado1 = Math.floor(Math.random() * 6) + 1;
        this.dado2 = Math.floor(Math.random() * 6) + 1;
        console.log(`Dados: ${this.dado1} + ${this.dado2} = ${this.dado1 + this.dado2}`);
    }

    public getApuestaMinima(): number {
        return this.apuestaMinima;
    }
    public setApuestaMinima(value: number) {
        this.apuestaMinima = value;
    }

    private inicializarNuevoJuego():void {
        this.dado1 = 0;
        this.dado2 = 0;
        this.gano = false;
        this.punto = 0;
    }
    private validarMontoApuesta(valor: string): boolean {
        return !isNaN(parseInt(valor)) && parseInt(valor) >= 0 && parseInt(valor) <= 100000000;  //ver si este es el limite sup generado
    }

    public ingresarApuesta():number {
      
            let montoApuesta: number;
            let montoApuestaString: string;
            let errorEntrada: boolean = true
            
            do {
                console.clear();
                funciones.mensajeAlerta(`La apuesta puede variar entre ${this.apuestaMinima} y ${this.apuestaMaxima}`,"azul");
                funciones.mensajeAlerta("Ingrese la apuesta: ","azul")
                // para evitar el scroll indefinido usamos una variable bool 
                if (!errorEntrada) {
                    funciones.mensajeAlerta("Monto inválido. Debe ser un numero entre 1 y 100000000.","rojo");
                }
                
                montoApuestaString = rls.question(funciones.igualoCadena("", 31, " ") + 'Ingrese el la apuesta (0: sale): '.green);
                montoApuesta = parseInt(montoApuestaString);
                if (!this.validarMontoApuesta(montoApuestaString)) { errorEntrada = false; }
        
            } while (!this.validarMontoApuesta(montoApuestaString));

            return parseInt(montoApuestaString);
    }

    public apostar(jugador:Cliente): void {
        let montoApuesta:number =this.ingresarApuesta();
        if (jugador.getACredito() < montoApuesta) {
            funciones.mensajeAlerta("No tiene suficiente credito", "rojo");
        }else {
            this.apuesta = montoApuesta;
            this.jugar();
            let montoaPagar:number = this.pagar();
            if (montoaPagar > 0) {
                funciones.mensajeAlerta(`Felicitaciones!  GANO ${montoaPagar}$ 💰💰💰`,"verde");
                let saldoExistente:number = jugador.getACredito();
                jugador.setCredito(saldoExistente+montoaPagar);
                
            } else {
                funciones.mensajeAlerta("Lo siento, has perdido esta vez. 😢 ¡No te rindas, inténtalo de nuevo!","amarillo")
            }
            funciones.mensajeAlerta(`Saldo actual: ${jugador.getACredito()}$`,"verde");
        }
        

    }
    public jugar(): void {
        this.inicializarNuevoJuego();
        //primera jugada
        this.tirarDados();
        if (this.dado1 + this.dado2 == 7 || this.dado1 + this.dado2 == 11) { //gana con 7 u 11
            this.gano = true;
        } else {
            if (this.dado1 + this.dado2 == 2 || this.dado1 + this.dado2 == 3 || this.dado1 + this.dado2 == 12) { //pierde con 2,3 o 12
                this.gano = false
            } else {
                this.punto = this.dado1 + this.dado2;
                console.log(`Punto establecido en: ${this.punto}`);
            }
            // jugada de punto
            if (this.punto != 0) { 
                let salida: string = "SIGUE";
                do {
                    this.tirarDados();
                    if (this.dado1 + this.dado2 == this.punto) {
                        this.gano = true;
                        salida = "GANO";
                    } else {
                        if (this.dado1 + this.dado2 == 7) {
                            this.gano = false;
                            salida = "PERDIO"
                        } else {
                            console.log(`Continúa tirando para alcanzar el punto ${this.punto}`);
                        }
                    }

                } while (salida == "SIGUE");

            }
           
        }
    }
    public pagar():number {
        if (this.gano) {
            return this.apuesta*2
        }
        return 0
    }
}
   
