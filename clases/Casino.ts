import { Juego } from "./juego";
import { TragamonedasClasico } from "./tragamonedas/TragamonedasClasico";
import { TragamonedasTematico } from "./tragamonedas/TragamonedasTematico";
import { BlackJack } from "./Blackjack/blackjack";
import { Ruleta } from "./ruleta/Ruleta";
import { PaseIngles } from "./Dados/PaseIngles";
import { Cliente } from "./Cliente";
import * as rls from "readline-sync";
import * as Funciones from "../Funciones/funciones";
import 'colors';
// import { Ruleta } from "./ruleta/claseRuleta";
// import { BlackJack } from "./Blackjack/blackjack";


import * as fs from "fs";


export class Casino {
  clientes: Cliente[] = [];
  juegos: Juego[] = [];

  constructor() {
    const juego1 = new TragamonedasClasico();
    const juego2 = new TragamonedasTematico();
    const juego3 = new Ruleta(); //ACA CAMBIAR POR BLACKJACK
    const juego4 = new Ruleta();
    const juego5 = new PaseIngles();
    this.juegos.push(juego1, juego2, juego3, juego4, juego5);
  }

  public abrirCasino(): void {
    let jugador: Cliente;

    this.clientes = this.leeDatosCliente("./clases/datos/clientes.txt");
    Funciones.mensajeAlerta("          🃏    BIENVENIDOS al CASINO     🃏          ", "verde");

    let dni: number = this.ingresarDni();
    let clienteIndex: number = this.existeDni(dni, this.clientes);
    if (dni !== 0) {
      if (clienteIndex !== -1) {
        Funciones.mensajeAlerta("Cliente encontrado: ", "azul");
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
      // console.clear();
      Funciones.mensajeAlerta("Por favor, ingrese su DNI:", "azul");
      if (!errorEntrada) {
        Funciones.mensajeAlerta("DNI inválido. Debe ser un número.", "rojo");
      }
      let dniString: string = rls.question(
        Funciones.igualoCadena("\n", 31, " ") + "Ingrese el DNI (0 para salir): ".green
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
      Funciones.mensajeAlerta(cartel, "azul");
      if (!errorEntrada) {
        Funciones.mensajeAlerta("Error en el ingreso del nombre", "rojo");
      }
      nombre = rls.question(
        Funciones.igualoCadena("\n", 31, " ") + "Ingrese el nombre: ".green
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
      // console.clear();
      Funciones.mensajeAlerta("Por favor, ingrese el dinero que desea tener a favor :", "azul");
      if (!errorEntrada) {
        Funciones.mensajeAlerta(
          "Monto inválido. Debe ser un número mayor que 0.",
          "rojo"
        );
      }
      let creditoString: string = rls.question(
        Funciones.igualoCadena("\n", 31, " ") +
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
      Funciones.mensajeAlerta("No se encontro el cliente", "rojo");
    }
  }

  private mostrarMenu(jugador: Cliente): void {
    let opcion: string;
    let condicion: string = "";
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
      console.clear();
      Funciones.pantallaMenu("      CASINO ON-LINE ", servicios, 30, 40, 2);
      if (!errorIngreso) {
        Funciones.lineaConRecuadroError(
          30,
          "Opción inválida. Por favor, intente nuevamente",
          40,
          2
        );
      }
      opcion = rls.question(
        Funciones.igualoCadena("", 31, " ") +
        "Seleccione una de las opciones:".green
      );
      condicion = "1";
      console.clear();
      switch (opcion) {
        case "1":
          Funciones.mensajeAlerta("          🍒    BIENVENIDOS TRAGAMONEDAS CLASICO    🍒          ", "verde");
          // console.log("seleccionaste Tragamonedas Clásico");
          this.leerArchivoInstrucciones("./clases/datos/tragamonedas.txt", "Tragamonedas");
          this.repetirUnJuego(0, jugador);
          break;
        case "2":
          // console.log("seleccionaste Tragamonedas Temático");
          this.leerArchivoInstrucciones("./clases/datos/tragamonedas.txt", "Tragamonedas");
          Funciones.mensajeAlerta("          🍀    BIENVENIDOS TRAGAMONEDAS TEMATICO    🍀          ", "verde");
          this.repetirUnJuego(1, jugador);
          break;
        case "3":
          Funciones.mensajeAlerta("          🃏    BIENVENIDOS A BLACKJACK    🃏          ", "verde");
          this.leerArchivoInstrucciones("./clases/datos/blackJack.txt", "Blackjack");
          this.repetirUnJuego(2, jugador); //VER COMO SE INICIA BLACKJACK
          break;
        case "4":
          Funciones.mensajeAlerta("              BIENVENIDOS A RULETA              ", "verde");
          this.leerArchivoInstrucciones("./clases/datos/ruleta.txt", "Ruleta");
          this.repetirUnJuego(3, jugador);

          break;
        case "5":
          Funciones.mensajeAlerta("          🎲    BIENVENIDOS A PASE INGLES    🎲          ", "verde");
          this.leerArchivoInstrucciones("./clases/datos/paseIngles.txt", "Pase Ingles");
          this.repetirUnJuego(4, jugador);
          break;
        case "6":
          Funciones.mensajeAlerta("          💵    BIENVENIDOS A CARGAR CREDITO    💵          ", "verde");
          this.cargarCredito(jugador);
          break;
        case "7":
          Funciones.mensajeAlerta("              LISTAR CLIENTE              ", "verde");
          console.log("\n");
          Funciones.mensajeAlertaSinMarco(jugador.mostrarCliente(), "azul");
          condicion = rls.question(
            Funciones.igualoCadena("", 31, " ") +
            `\n Presione una tecla para continuar ...`.green
          );
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

  public repetirUnJuego(indice: number, jugador: Cliente) {
    let condicion = "1";
    console.clear();
    while (parseInt(condicion) > 0) {
      if (indice == 3) {
        (this.juegos[2] as Ruleta).comenzarAJugar(jugador);
      } else {
        this.juegos[indice].apostar(jugador);
      }
      condicion = rls.question(
        Funciones.igualoCadena("\n", 20, " ") +
        ` Si desea seguir apostando a ${this.juegos[indice].getNombre()}, presione un numero mayor a 0  `.green);
      console.clear();
    }
  }

  public grabaDatos(archivo: string, datos: Cliente[]): void {
    // Convertir los datos a JSON
    const datosJSON = JSON.stringify(datos, null, 2);
    // Escribir datos en un archivo .txt
    fs.writeFileSync(archivo, datosJSON, "utf-8");
    //console.log(Archivo ${archivo} creado con éxito.);
  }

  public leeDatosCliente(archivo: string): Cliente[] {
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


  // public leeDatosInstrucciones(archivo: string): string[] {
  //   // Leer el archivo
  //   const datos = fs.readFileSync(archivo, "utf-8");
  //   // Parsear los datos leídos
  //   const objetosLeidos: any[] = JSON.parse(datos);
  //   const texto: string[] = [];

  //   // Reconstituir los objetos como instancias de Cliente
  //   objetosLeidos.forEach((linea) => {
  //     texto.push(linea);
  //   });

  //   return texto;
  // }

  public leerArchivoInstrucciones(ruta: string, titulo: string) {
    // VER
    //const ruta = `./instrucciones/${juego.toLowerCase()}.txt`;
    if (fs.existsSync(ruta)) {
      const instrucciones = fs.readFileSync(ruta, "utf-8");
      Funciones.mensajeAlerta(`Instrucciones para ${titulo} `, "azul");
      console.log(`\n${instrucciones}`);
      console.log("\n \n");
      let caracter = rls.question(" Presione una tecla para continuar ...").blue;
      console.log("\n \n");
    } else {
      Funciones.mensajeAlerta(`\nNo se encontraron instrucciones para ${titulo}.`, "amarillo");
    }
  }
}
