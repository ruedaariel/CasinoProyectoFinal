//import { JuegoCasino } from "../../interfaz/juegoCasino";
import { Cliente } from "../Cliente";
import * as funciones from "../../Funciones/funciones";
import * as rls from "readline-sync";
import "colors";
import { Juego } from "../juego";

export class PaseIngles extends Juego {
    private dado1: number = 0;
    private dado2: number = 0;
    private punto: number = 0;
    private apuesta: number = 0; //monto de la apuesta
    private gano: boolean = false;
  
    constructor () {
        super();
        this.setNombre("Pase Ingles");
        this.setApuestaMinima(100) ;
        this.setApuestaMaxima(10000);
        
    }

    public getGano(): boolean {
        return this.gano;
    }

    private tirarDados(): void {
        this.dado1 = Math.floor(Math.random() * 6) + 1;
        this.dado2 = Math.floor(Math.random() * 6) + 1;
       
    }

    private inicializarNuevoJuego():void {
        this.dado1 = 0;
        this.dado2 = 0;
        this.gano = false;
        this.punto = 0;
    }
    private validarMontoApuesta(valor: string, montoMinimo: number, montoMaximo: number): boolean {
       // return !isNaN(parseInt(valor)) && parseInt(valor) == 0 || parseInt(valor) >= montoMinimo && parseInt(valor) <= montoMaximo; 
       return !isNaN(parseInt(valor)) && (parseInt(valor) == 0 || (parseInt(valor) >= montoMinimo && parseInt(valor) <= montoMaximo));
    }
    

    public ingresarApuesta(montoMinimo: number, montoMaximo: number): number {
        let montoApuesta: number;
        let montoApuestaString: string; //se ingresa como string y despues se convierte
        let errorEntrada: boolean = true

        do {
           // console.clear();
            funciones.mensajeAlerta(`La apuesta puede variar entre ${this.apuestaMinima} y ${this.apuestaMaxima}`, "azul");
          
            // para evitar el scroll indefinido usamos una variable bool 
            if (!errorEntrada) {
                funciones.mensajeAlerta(`Monto inválido. Debe ser un numero entre ${montoMinimo} y ${montoMaximo}`, "rojo");
            }

            montoApuestaString = rls.question(funciones.igualoCadena("\n", 31, " ") + 'Ingrese el la apuesta (0: sale): '.green);
            montoApuesta = parseInt(montoApuestaString); //convierte a numero
            if (!this.validarMontoApuesta(montoApuestaString, montoMinimo, montoMaximo)) { errorEntrada = false; }

        } while (!this.validarMontoApuesta(montoApuestaString, montoMinimo, montoMaximo));

        return parseInt(montoApuestaString);
    }

    public apostar(jugador: Cliente): void {
        let montoApuesta: number = this.ingresarApuesta(this.apuestaMinima, this.apuestaMaxima);
        if (montoApuesta != 0) { //con 0 sale
            if (jugador.getACredito() < montoApuesta) { //controla que tenga credito suficiente
                funciones.mensajeAlerta("No tiene suficiente credito", "rojo");
            } else {
                this.apuesta = montoApuesta;
                
                jugador.setCredito(jugador.getACredito()-this.apuesta); //antes de jugar, le resta la apuesta al credito
                
                this.jugar();
                let montoaPagar: number = this.pagar(); //con los datos de la clase, calcula cuanto le tiene que pagar, sale con 0 si perdió
                if (montoaPagar > 0) {
                    funciones.mensajeAlerta(`Felicitaciones!  GANO ${montoaPagar}$ 💰💰💰`, "verde");
                    let saldoExistente: number = jugador.getACredito(); 
                    jugador.setCredito(saldoExistente + montoaPagar);//le acredita el premio

                } else {
                    funciones.mensajeAlerta(`Lo siento ${jugador.getNombre()} , has perdido esta vez. 😢 ¡No te rindas, inténtalo de nuevo!`, "amarillo")
                }
                funciones.mensajeAlerta(`Saldo actual: ${jugador.getACredito()}$`, "verde"); //muestra el credito que le quedó al jugador
              //  let caracter = rls.question("\n Presione una tecla para continuar ...").blue;
            }
        }
    }

    public jugar(): void {
        this.inicializarNuevoJuego();
        //primera jugada
        console.clear();
        funciones.mensajeAlerta("Estas en el Tiro de Salida, con 11 o 7, ganás","azul");
        this.tirarDados();
        
        funciones.dibujaUnDado(this.dado1, this.dado2);
        funciones.mensajeAlertaSinMarco(`Dados: ${this.dado1} + ${this.dado2} = ${this.dado1 + this.dado2}`, "azul");
        if (this.dado1 + this.dado2 == 7 || this.dado1 + this.dado2 == 11) { //gana con 7 u 11
            this.gano = true;
        } else {
            if (this.dado1 + this.dado2 == 2 || this.dado1 + this.dado2 == 3 || this.dado1 + this.dado2 == 12) { //pierde con 2,3 o 12
                this.gano = false
            } else {
                this.punto = this.dado1 + this.dado2;
            }

            // jugada de punto
            if (this.punto != 0) { //si ya ganó o perdió, el punto queda en 0
                let salida: string = "SIGUE";
                do {
                   // let caracter = rls.question(" \n Presione una tecla para continuar ...").blue;
                    console.clear();
                    funciones.mensajeAlerta(`Estas en el Tiro de Punto, con ${this.punto}, ganás`,"azul");
                    this.tirarDados();
                    funciones.dibujaUnDado(this.dado1, this.dado2);
                    funciones.mensajeAlertaSinMarco(`Dados: ${this.dado1} + ${this.dado2} = ${this.dado1 + this.dado2}`, "azul");
                   
                    
                    
                    if (this.dado1 + this.dado2 == this.punto) { //gana cuando sale el punto
                        this.gano = true;
                        salida = "GANO";
                    } else {
                        if (this.dado1 + this.dado2 == 7) { //pierde si sale el 7
                            this.gano = false;
                            salida = "PERDIO"
                        } else {
                            //funciones.mensajeAlertaSinMarco(`\n \n Sigues jugando ...`, "amarillo");
                            let caracter = rls.question("\n  Sigues jugando ...   \n Presione una tecla para continuar ...".yellow);
                        }
                    }

                } while (salida == "SIGUE");

            }

        }
    }

    public pagar(): number { //calcula el premio
        if (this.gano) {
            return this.apuesta * 2
        }
        return 0 //devuelve 0 si perdió
    }
}
   
