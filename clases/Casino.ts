import { TragamonedasClasico } from "./tragamonedas/TragamonedasClasico";
import { TragamonedasTematico } from "./tragamonedas/TragamonedasTematico";
import { Cliente } from "./Cliente";
import * as rls from "readline-sync";
import * as funciones from "../Funciones/funciones";
// import { Ruleta } from "./ruleta/claseRuleta";
// import { BlackJack } from "./Blackjack/blackjack";
import { PaseIngles } from "./Dados/PaseIngles";
import * as menu from "../Funciones/funciones";
import * as fs from "fs";

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
    let jugador: Cliente;
    this.clientes = this.leeDatos("./clases/datos/clientes.txt");
    let dni: number = this.ingresarDni();
    let clienteIndex: number = this.existeDni(dni, this.clientes);
    if (dni !== 0) {
      if (clienteIndex !== -1) {
        menu.mensajeAlerta("Cliente encontrado: ", "azul");
        this.clientes[clienteIndex].mostrarCliente();
        jugador = this.clientes[clienteIndex];
      } else {
        jugador = this.hacerAltaCliente(dni);
      }
      this.mostrarMenu(jugador);
      this.grabaDatos("./clases/datos/clientes.txt", this.clientes);
    }
  }

  private ingresarDni(): number {
    let dni: number;
    let errorEntrada: boolean = true;

    do {
      console.clear();
      menu.mensajeAlerta("Por favor, ingrese su DNI:", "azul");
      if (!errorEntrada) {
        menu.mensajeAlerta("DNI inválido. Debe ser un número.", "rojo");
      }
      let dniString: string = rls.question(
        menu.igualoCadena("", 31, " ") + "Ingrese el DNI (0 para salir): ".green
      );
      dni = parseInt(dniString);
      if (isNaN(dni) || dni < 0) {
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
      menu.mensajeAlerta(cartel, "azul");
      if (!errorEntrada) {
        menu.mensajeAlerta("Error en el ingreso del nombre", "rojo");
      }
      nombre = rls.question(
        menu.igualoCadena("", 31, " ") + "Ingrese el nombre: ".green
      );
      if (nombre.trim() === "") {
        errorEntrada = false;
      } else {
        errorEntrada = true;
      }
    } while (!errorEntrada);
    console.clear();
    return nombre;
  }
  private hacerAltaCliente(dni: number): Cliente {
    const nombre: string = this.ingresarNombre();
    const nuevoCliente = new Cliente(dni, nombre);
    this.clientes.push(nuevoCliente);
    return nuevoCliente;
  }
  private ingresarCredito(): number {
    let creditoCliente: number;
    let creditoString: string = "";
    let errorEntrada: boolean = true;

    do {
      console.clear();
      menu.mensajeAlerta(
        "Por favor, ingrese el dinero que desea tener a favor :",
        "azul"
      );
      if (!errorEntrada) {
        menu.mensajeAlerta(
          "Monto inválido. Debe ser un número mayor que 0.",
          "rojo"
        );
      }
      let creditoString: string = rls.question(
        menu.igualoCadena("", 31, " ") +
          "Ingrese el monto (0 para salir): ".green
      );
      creditoCliente = parseInt(creditoString);
      if (isNaN(creditoCliente) || creditoCliente < 0) {
        errorEntrada = false;
      } else {
        errorEntrada = true;
      }
    } while (!errorEntrada);
    console.clear();
    return creditoCliente;
  }
  public cargarCredito(jugador: Cliente): void {
    jugador.mostrarCliente();
    if (jugador) {
      let nuevoCredito = this.ingresarCredito();
      if (nuevoCredito != 0) {
        jugador.setCredito(jugador.getACredito() + nuevoCredito);
      }
    } else {
      menu.mensajeAlerta("No se encontro el cliente", "rojo");
    }
  }

  private mostrarMenu(jugador: Cliente): void {
    let opcion: string;
    let condicion: string="";
    let errorIngreso: boolean = true;
    console.clear();
    const servicios: string[] = [
      "1. Tragamonedas Clasico",
      "2. Tragamonedas Tematico",
      "3. Blackjack",
      "4. Ruleta",
      "5. Dados",
      "6. Cargar Crédito",
      "7. Listar Cliente",
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
      opcion = rls.question(this.igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green
      );
      condicion = "1";
      switch (opcion) {
        case "1":
          console.log("seleccionaste Tragamonedas Clásico");
          while (parseInt(condicion)>0) {
            this.tragamonedasClasico.apostar(jugador);
            condicion = rls.question(funciones.igualoCadena("", 31, " ") + 'Si desea seguir apostando ingrese un número mayor a 0: '.green)
          }
          break;
          case "2":
            console.log("seleccionaste Tragamonedas Temático");
            while (parseInt(condicion)>0) {
              this.tragamonedasTematico.apostar(jugador);
              condicion = rls.question(funciones.igualoCadena("", 31, " ") + 'Si desea seguir apostando ingrese un número mayor a 0: '.green)
            }
            break;
        case "3":
          console.log("seleccionaste Blackjack");
          break;
        case "4":
          console.log("seleccionaste Ruleta");
          break;
        case "5":
          console.log("seleccionaste Dados");
          while (parseInt(condicion)>0) {
            this.paseIngles.apostar(jugador);
            condicion = rls.question("Si desea seguir apostando ingrese un número mayor a 0: ")
          }
          break;
        case "6":
          console.log("seleccionaste Cargar Crédito");
          this.cargarCredito(jugador);
          break;
        case "7":
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

  public grabaDatos(archivo: string, datos: Cliente[]): void {
    // Convertir los datos a JSON
    const datosJSON = JSON.stringify(datos, null, 2);
    // Escribir datos en un archivo .txt
    fs.writeFileSync(archivo, datosJSON, "utf-8");
    //console.log(Archivo ${archivo} creado con éxito.);
  }

  public leeDatos(archivo: string): Cliente[] {
    // Leer el archivo
    const datos = fs.readFileSync(archivo, "utf-8");
    // Parsear los datos leídos
    const objetosLeidos: any[] = JSON.parse(datos);
    const clientes: Cliente[] = [];

    // Reconstituir los objetos como instancias de Cliente
    objetosLeidos.forEach((objeto) => {
      const cliente = new Cliente(objeto.dni, objeto.nombre);

      cliente.setCredito(objeto.credito);

      clientes.push(cliente);
    });

    return clientes;
  }
}
