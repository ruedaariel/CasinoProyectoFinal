import { TragamonedasClasico } from "./tragamonedas/TragamonedasClasico";
import { TragamonedasTematico } from "./tragamonedas/TragamonedasTematico";
import { Cliente } from "./Cliente";
import * as rls from "readline-sync";
import * as funciones from "../Funciones/funciones";
import { Ruleta } from "./ruleta/claseRuleta";
// import { Ruleta } from "./ruleta/claseRuleta";
// import { BlackJack } from "./Blackjack/blackjack";
import { PaseIngles } from "./Dados/PaseIngles";
import * as menu from "../Funciones/funciones";
import * as fs from "fs";

export class Casino {
  clientes: Cliente[] = [];
  tragamonedasClasico: TragamonedasClasico;
  tragamonedasTematico: TragamonedasTematico;
  ruleta : Ruleta;
  // blackjack : BlackJack;
  paseIngles: PaseIngles;

  constructor() {
    this.tragamonedasClasico = new TragamonedasClasico();
    this.tragamonedasTematico = new TragamonedasTematico();
    this.ruleta =  new Ruleta();
    //    this.blackjack = new BlackJack();
    this.paseIngles = new PaseIngles();
  }

  public abrirCasino(): void {
    let jugador: Cliente;
    this.clientes = this.leeDatos("./clases/datos/clientes.txt");
    // ************************** recien agregado ******************
    menu.mensajeAlerta("          🃏    BIENVENIDOS al CASINO     🃏          ", "verde");
    // let caracter = rls.question(" Presione una tecla para continuar ...").blue;
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
      // console.clear();
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
      funciones.pantallaMenu("      CASINO ON-LINE ", servicios, 30, 40, 2);
      if (!errorIngreso) {
        funciones.lineaConRecuadroError(
          30,
          "Opción inválida. Por favor, intente nuevamente",
          40,
          2
        );
      }
      opcion = rls.question(
        funciones.igualoCadena("", 31, " ") +
        "Seleccione una de las opciones:".green
      );
      condicion = "1";
      console.clear();
      switch (opcion) {
        case "1":
          menu.mensajeAlerta("          🍒    BIENVENIDOS TRAGAMONEDAS CLASICO    🍒          ", "verde");
          // console.log("seleccionaste Tragamonedas Clásico");
          this.leerArchivoInstrucciones("./clases/datos/tragamonedas.txt", "Tragamonedas");
          while (parseInt(condicion) > 0) {
            this.tragamonedasClasico.apostar(jugador);
            condicion = rls.question(
              funciones.igualoCadena("", 31, " ") +
              "Si desea seguir apostando ingrese un número mayor a 0: ".green
            );
          }
          break;
        case "2":
          // console.log("seleccionaste Tragamonedas Temático");
          this.leerArchivoInstrucciones("./clases/datos/tragamonedas.txt", "Tragamonedas");
          menu.mensajeAlerta("          🍀    BIENVENIDOS TRAGAMONEDAS TEMATICO    🍀          ", "verde");
          while (parseInt(condicion) > 0) {
            this.tragamonedasTematico.apostar(jugador);
            condicion = rls.question(
              funciones.igualoCadena("", 31, " ") +
              "Si desea seguir apostando ingrese un numero mayor a 0: ".green
            );
          }
          break;
        case "3":
          menu.mensajeAlerta("          🃏    BIENVENIDOS A BLACKJACK    🃏          ", "verde");
          this.leerArchivoInstrucciones("./clases/datos/blackJack.txt", "Blackjack");
          
          break;
        case "4":
          menu.mensajeAlerta("          ⚪    BIENVENIDOS A RULETA    ⚪          ", "verde");
          this.leerArchivoInstrucciones("./clases/datos/ruleta.txt", "Ruleta");
          this.ruleta.comenzarAJugar(jugador);
          break;
        case "5":
          //  console.log("seleccionaste Dados");
          menu.mensajeAlerta("          🎲    BIENVENIDOS A PASE INGLES    🎲          ", "verde");

          this.leerArchivoInstrucciones("./clases/datos/paseIngles.txt", "Pase Ingles");
          while (parseInt(condicion) > 0) {
            this.paseIngles.apostar(jugador);
            condicion = rls.question(funciones.igualoCadena("", 31, " ") + "Si desea seguir apostando ingrese un numero mayor a 0: ".green);
          }
          break;
        case "6":
          menu.mensajeAlerta("          💵    BIENVENIDOS A CARGAR CREDITO    💵          ", "verde");
          // console.log("seleccionaste Cargar Crédito");
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


  public leeDatosInstrucciones(archivo: string): string[] {
    // Leer el archivo
    const datos = fs.readFileSync(archivo, "utf-8");
    // Parsear los datos leídos
    const objetosLeidos: any[] = JSON.parse(datos);
    const texto: string[] = [];

    // Reconstituir los objetos como instancias de Cliente
    objetosLeidos.forEach((linea) => {
      texto.push(linea);
    });

    return texto;
  }

  public leerArchivoInstrucciones(ruta: string, titulo: string) {
    // VER
    //const ruta = `./instrucciones/${juego.toLowerCase()}.txt`;
    if (fs.existsSync(ruta)) {
      const instrucciones = fs.readFileSync(ruta, "utf-8");
      menu.mensajeAlerta(`Instrucciones para ${titulo} `, "azul");
      console.log(`\n${instrucciones}`);
      console.log("\n \n");
      let caracter = rls.question(" Presione una tecla para continuar ...").blue;
      console.log("\n \n");
    } else {
      menu.mensajeAlerta(`\nNo se encontraron instrucciones para ${titulo}.`, "amarillo");
    }
  }
}
