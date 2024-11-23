
import { TragamonedasClasico } from "./tragamonedas/TragamonedasClasico";
import { TragamonedasTematico } from "./tragamonedas/TragamonedasTematico";
import { Cliente } from "./Cliente";
import * as rls from 'readline-sync';
// import { Ruleta } from "./ruleta/claseRuleta";
// import { BlackJack } from "./Blackjack/blackjack";
import { PaseIngles } from "./Dados/PaseIngles";

export class Casino {
    clientes: Cliente[] = [];
    tragamonedasClasico: TragamonedasClasico;
    tragamonedasTematico: TragamonedasTematico;
    // ruleta : Ruleta;
    // blackjack : BlackJack;
    paseIngles: PaseIngles;
    constructor() {

        this.tragamonedasClasico = new TragamonedasClasico();
        this.tragamonedasTematico = new TragamonedasTematico();
        //    this.ruleta =  new Ruleta();
        //    this.blackjack = new BlackJack();
        this.paseIngles = new PaseIngles();
    }

    public abrirCasino(): void {
        let dni: number = this.ingresarDni();
        let clienteIndex: number = this.existeDni(dni, this.clientes);
        if (clienteIndex !== -1) {
            console.log("Cliente encontrado: ");
            this.clientes[clienteIndex].mostrarCliente();
        } else {
            console.log("Cliente no encontrado. Debe registrarse.");
        }
    }

    private ingresarDni(): number {
        let dni: number;
        let errorEntrada: boolean = true;

        do {
            console.clear();
            console.log("Por favor, ingrese su DNI:");
            if (!errorEntrada) {
                console.log("DNI inválido. Debe ser un número.");
            }
            let dniString: string = rls.question('Ingrese el DNI (0 para salir): ');
            dni = parseInt(dniString);
            if (isNaN(dni) || dni <= 0) {
                errorEntrada = false;
            } else {
                errorEntrada = true;
            }
        } while (!errorEntrada); console.clear(); return dni;
    }
    private existeDni(dni: number, clientes: Cliente[]): number {
        return clientes.findIndex(cliente => cliente.getDni() === dni);
    }

}

// hacer funcion abrirCasino
//solicitar ingreso de dni y validar si existe o no en el arreglo clientes
// si no existe, solicitar nombre, dni, y credito
// hacer un metodo para crear un menu que tenga opciones (varios juegos, cargar credito)
// dentro de cada opcion un clg
