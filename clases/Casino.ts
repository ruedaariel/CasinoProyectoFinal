import { TragamonedasClasico } from "./tragamonedas/TragamonedasClasico";
import { TragamonedasTematico } from "./tragamonedas/TragamonedasTematico";
import { Cliente } from "./Cliente";
import * as rls from "readline-sync";
// import { Ruleta } from "./ruleta/claseRuleta";
// import { BlackJack } from "./Blackjack/blackjack";
import { PaseIngles } from "./Dados/PaseIngles";
import * as menu from "../Funciones/funciones";

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
      this.hacerAltaCliente(dni);
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
      let dniString: string = rls.question("Ingrese el DNI (0 para salir): ");
      dni = parseInt(dniString);
      if (isNaN(dni) || dni <= 0) {
        errorEntrada = false;
      } else {
        errorEntrada = true;
      }
    } while (!errorEntrada);
    console.clear();
    return dni;
  }
  private existeDni(dni: number, clientes: Cliente[]): number {
    return clientes.findIndex((cliente) => cliente.getDni() === dni);
  }

  private ingresarNombre(): string {
    let nombre: string;
    let errorEntrada: boolean = true;
    let cartel: string = "Ingrese nombre del Cliente";
    do {
      console.clear();
      console.log(cartel);
      if (!errorEntrada) {
        console.log("Nombre inválido. Vuelva a ingresar.");
      }
      nombre = rls.question("Ingrese el nombre: ");
      if (nombre.trim() === "") {
        errorEntrada = false;
      } else {
        errorEntrada = true;
      }
    } while (!errorEntrada);
    console.clear();
    return nombre;
  }
  private hacerAltaCliente(dni: number): void {
    const nombre: string = this.ingresarNombre();
    const nuevoCliente = new Cliente(dni, nombre);
    this.clientes.push(nuevoCliente);
    console.log(`Cliente ${nombre} dado de alta con DNI ${dni}`);
  }

  private mostrarMenu(): void {
    let opcion: string;
    let errorIngreso: boolean = true;
    console.clear();
    const servicios: string[] = [
      "1. Blackjack",
      "2. Ruleta",
      "3. Dados",
      "4. Cargar Crédito",
      "5. Administrar Usuario",
      "0. Salir",
    ];
    do {
      this.pantallaMenu(" Casino ", servicios, 30, 40, 2);
      if (!errorIngreso) {
        this.lineaConRecuadroError(
          30,
          "Opción inválida. Por favor, intente nuevamente",
          40,
          2
        );
      }
      opcion = rls.question(
        this.igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green
      );
      switch (opcion) {
        case "1":
          console.log("seleccionaste Blackjack");
          break;
        case "2":
          console.log("seleccionaste Ruleta");
          break;
        case "3":
          console.log("seleccionaste Dados");
          break;
        case "4":
          console.log("seleccionaste Cargar Crédito");
          break;
        case "5":
          console.log("seleccionaste Administrar Usuario");
          break;
        case "0":
          console.log("Saliendo del menú...");
          break;
        default:
          errorIngreso = false;
          console.clear();
          break;
      }
    } while (opcion !== "0");
  }

  private pantallaMenu(
    titulo: string,
    opciones: string[],
    padIzquierdo: number,
    ancho: number,
    set: number
  ): void {
    this.lineaConRecuadro(padIzquierdo, titulo, ancho, set);
    this.cierreSuperior(padIzquierdo, ancho, set);
    opciones.forEach((element) => {
      this.armaLinea(padIzquierdo, element, ancho, set);
    });
    this.cierreInferior(padIzquierdo, ancho, set);
  }
  private cierreSuperior(
    padIzquierdo: number,
    ancho: number,
    set: number
  ): void {
    if (set === 1) {
      console.log(
        this.igualoCadena(" ", padIzquierdo, " ") +
          "┌" +
          this.igualoCadena("─", ancho, "─") +
          "┐"
      );
    } else {
      console.log(
        this.igualoCadena(" ", padIzquierdo, " ") +
          "╔" +
          this.igualoCadena("═", ancho, "═") +
          "╗"
      );
    }
  }
  private cierreInferior(
    padIzquierdo: number,
    ancho: number,
    set: number
  ): void {
    if (set === 1) {
      console.log(
        this.igualoCadena(" ", padIzquierdo, " ") +
          "└" +
          this.igualoCadena("─", ancho, "─") +
          "┘"
      );
    } else {
      console.log(
        this.igualoCadena(" ", padIzquierdo, " ") +
          "╚" +
          this.igualoCadena("═", ancho, "═") +
          "╝"
      );
    }
  }
  private armaLinea(
    padIzquierdo: number,
    texto: string,
    ancho: number,
    set: number
  ): void {
    if (set === 1) {
      console.log(
        this.igualoCadena(" ", padIzquierdo, " ") +
          "│ " +
          this.igualoCadena(texto, ancho - 1, " ").green +
          "│"
      );
    } else {
      console.log(
        this.igualoCadena(" ", padIzquierdo, " ") +
          "║ " +
          this.igualoCadena(texto, ancho - 1, " ").green +
          "║"
      );
    }
  }
  private lineaConRecuadro(
    padIzquierdo: number,
    texto: string,
    ancho: number,
    set: number
  ): void {
    this.cierreSuperior(padIzquierdo, ancho, set);
    this.armaLinea(padIzquierdo, texto, ancho, set);
    this.cierreInferior(padIzquierdo, ancho, set);
  }
  private lineaConRecuadroError(
    padIzquierdo: number,
    texto: string,
    ancho: number,
    set: number
  ): void {
    this.cierreSuperior(padIzquierdo, ancho, set);
    this.armaLineaError(padIzquierdo, texto, ancho, set);
    this.cierreInferior(padIzquierdo, ancho, set);
  }
  private armaLineaError(
    padIzquierdo: number,
    texto: string,
    ancho: number,
    set: number
  ): void {
    if (set === 1) {
      console.log(
        this.igualoCadena(" ", padIzquierdo, " ") +
          "│ " +
          this.igualoCadena(texto, ancho - 1, " ").red +
          "│"
      );
    } else {
      console.log(
        this.igualoCadena(" ", padIzquierdo, " ") +
          "║ " +
          this.igualoCadena(texto, ancho - 1, " ").red +
          "║"
      );
    }
  }
  private igualoCadena(
    cadena: string,
    largo: number,
    caracter: string
  ): string {
    return cadena.padEnd(largo, caracter);
  }
}
