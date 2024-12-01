import { Juego } from "./juego";
import { TragamonedasClasico } from "./tragamonedas/TragamonedasClasico";
import { TragamonedasTematico } from "./tragamonedas/TragamonedasTematico";
import { BlackJack } from "./Blackjack2/blackjack";
import { Ruleta } from "./ruleta/Ruleta";
import { PaseIngles } from "./Dados/PaseIngles";
import { Cliente } from "./Cliente";
import * as rls from "readline-sync";
import * as funciones from "../Funciones/funciones";
import 'colors';
import * as fs from "fs";


export class Casino {
  private clientes: Cliente[] = [];
  private juegos: Juego[] = [];

  constructor() {
    this.juegos.push(new TragamonedasClasico());
    this.juegos.push(new TragamonedasTematico());
    this.juegos.push(new BlackJack());
    this.juegos.push(new Ruleta());
    this.juegos.push(new PaseIngles());
  }

  public abrirCasino(): void {
    let jugador: Cliente;
    let condicion: string = "";

    //carga los datos desde el archivo
    this.clientes = this.leeDatosCliente("./clases/datos/clientes.txt");

    funciones.mensajeAlerta("          🃏    BIENVENIDOS al CASINO     🃏          ", "verde");

    let dni: number = this.ingresarDni();
    let clienteIndex: number = this.existeDni(dni, this.clientes);
    if (dni !== 0) { //controla que no quiera salir
      if (clienteIndex !== -1) { //Cliente encontrado
        jugador = this.clientes[clienteIndex];
        funciones.mensajeAlertaSinMarco("Cliente encontrado:\n ", "azul");
        funciones.mensajeAlerta(jugador.mostrarCliente(), "azul");
      } else { //Carga de cliente nuevo
        jugador = this.hacerAltaCliente(dni);
        funciones.mensajeAlerta("Cliente guardado ", "azul");
      }

      condicion = rls.question(
        funciones.igualoCadena("", 31, " ") +
        `\n Presione una tecla para continuar ...`.green);

      //este menu permite acceder a las distintas opciones de casino
      this.mostrarMenu(jugador);

      //Cuando salgo, grabo los datos de los clientes
      this.grabaDatos("./clases/datos/clientes.txt", this.clientes);
    }
  }

  private ingresarDni(): number {
    //controla que sea un numero entre 10000000 y 100000000, el numero puede ser 0
    let dni: number;
    let errorEntrada: boolean = false;

    do {

      if (errorEntrada) {
        funciones.mensajeAlerta("DNI inválido. Debe ser un número.", "rojo");
      } else { funciones.mensajeAlerta("Por favor, ingrese su DNI:", "azul"); }

      let dniString: string = rls.question(
        funciones.igualoCadena("\n", 31, " ") + "Ingrese el DNI (0 para salir): ".green
      );

      dni = parseInt(dniString);
      if (isNaN(dni) || (dni < 1000000 && dni != 0) || dni > 99999999) {
        errorEntrada = true;
      } else {
        errorEntrada = false;
      }
    } while (errorEntrada);
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
      funciones.mensajeAlerta(cartel, "azul");
      if (!errorEntrada) {
        funciones.mensajeAlerta("Error en el ingreso del nombre", "rojo");
      }
      nombre = rls.question(
        funciones.igualoCadena("\n", 31, " ") + "Ingrese el nombre: ".green
      );
      if (nombre.trim() === "") { //controla que el nombre no sea vacio
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
      funciones.mensajeAlerta("Por favor, ingrese el dinero que desea tener a favor :", "azul");
      if (!errorEntrada) {
        funciones.mensajeAlerta(
          "Monto inválido. Debe ser un número mayor que 0.",
          "rojo"
        );
      }

      let creditoString: string = rls.question(funciones.igualoCadena("\n", 31, " ") + "Ingrese el monto (0 para salir): ".green);
      creditoCliente = parseInt(creditoString);
      if (isNaN(creditoCliente) || creditoCliente < 0) { //controla que sea un numero >= 0
        errorEntrada = false;
      } else {
        errorEntrada = true;
      }
    } while (!errorEntrada);
    console.clear();
    return creditoCliente;
  }

  public cargarCredito(jugador: Cliente): void {
    //muestra los datos del jugador
    funciones.mensajeAlertaSinMarco(jugador.mostrarCliente(), "azul");
    if (jugador) { //si no es undefined
      let nuevoCredito = this.ingresarCredito();
      if (nuevoCredito != 0) {
        jugador.setCredito(jugador.getACredito() + nuevoCredito);
      }  //si es 0, sale, no hace nada
    } else {
      funciones.mensajeAlerta("No se encontro el cliente", "rojo");
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
        funciones.lineaConRecuadroError(30, "Opción inválida. Por favor, intente nuevamente", 40, 2);
      }
      opcion = rls.question(funciones.igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green);
      condicion = "1";
      console.clear();

      switch (opcion) {
        case "1":
          funciones.mensajeAlerta("          🍒    BIENVENIDOS A TRAGAMONEDAS CLASICO    🍒          ", "verde");
          // console.log("seleccionaste Tragamonedas Clásico");
          this.leerArchivoInstrucciones("./clases/datos/tragamonedas.txt", "Tragamonedas");
          this.repetirUnJuego(0, jugador);
          break;
        case "2":
          // console.log("seleccionaste Tragamonedas Temático");
          this.leerArchivoInstrucciones("./clases/datos/tragamonedas.txt", "Tragamonedas");
          funciones.mensajeAlerta("          🍀    BIENVENIDOS A TRAGAMONEDAS TEMATICO    🍀          ", "verde");
          this.repetirUnJuego(1, jugador);
          break;
        case "3":
          funciones.mensajeAlerta("          🃏    BIENVENIDOS A BLACKJACK    🃏          ", "verde");
          this.leerArchivoInstrucciones("./clases/datos/blackJack.txt", "Blackjack");
          this.repetirUnJuego(2, jugador); //VER COMO SE INICIA BLACKJACK
          break;
        case "4":
          funciones.mensajeAlerta("              BIENVENIDOS A RULETA              ", "verde");
          this.leerArchivoInstrucciones("./clases/datos/ruleta.txt", "Ruleta");
          this.repetirUnJuego(3, jugador);

          break;
        case "5":
          funciones.mensajeAlerta("          🎲    BIENVENIDOS A PASE INGLES    🎲          ", "verde");
          this.leerArchivoInstrucciones("./clases/datos/paseIngles.txt", "Pase Ingles");
          this.repetirUnJuego(4, jugador);
          break;
        case "6":
          funciones.mensajeAlerta("          💵    BIENVENIDOS A CARGAR CREDITO    💵          ", "verde");
          this.cargarCredito(jugador);
          break;
        case "7":
          funciones.mensajeAlerta("              LISTAR CLIENTE              ", "verde");
          console.log("\n");
          funciones.mensajeAlertaSinMarco(jugador.mostrarCliente(), "azul");
          condicion = rls.question(
            funciones.igualoCadena("", 31, " ") +
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
        (this.juegos[indice] as Ruleta).comenzarAJugar(jugador);
      } else {
        this.juegos[indice].apostar(jugador);
      }
      condicion = rls.question(
        funciones.igualoCadena("\n", 20, " ") +
        ` Si desea seguir apostando a ${this.juegos[indice].getNombre()}, presione un numero mayor a 0:  `.green);
      console.clear();
    }
  }

  public grabaDatos(archivo: string, datos: Cliente[]): void {
    try {
      // Convertir los datos a JSON, null no aplica ninguna transformacion especial, space = 2 mejora la legilibilidad del JSON
      const datosJSON = JSON.stringify(datos, null, 2);
      // Escribir datos en un archivo .txt
      fs.writeFileSync(archivo, datosJSON, "utf-8");
    } catch (e) {
      funciones.mensajeAlertaSinMarco(`\n ${(e as Error).message}.`, "amarillo");
      let caracter = rls.question("\n Presione una tecla para continuar ...").blue;
    }
  }

  public leeDatosCliente(archivo: string): Cliente[] {
    const clientes: Cliente[] = [];
    try {
      // Lee el archivo
      const datos = fs.readFileSync(archivo, "utf-8");
      // Parsea los datos leídos
      const clientesLeidos: any[] = JSON.parse(datos);

      clientesLeidos.forEach((elem) => {
        const cliente = new Cliente(elem.dni, elem.nombre);
        //el credito no se carga en el constructor 
        cliente.setCredito(elem.credito);

        clientes.push(cliente);

      });
    } catch (e) {
      funciones.mensajeAlertaSinMarco("Error en archivo de Clientes, se retorna un arreglo vacio", "rojo");
      funciones.mensajeAlertaSinMarco(` ${(e as Error).message}`, "rojo");
    }
    finally {
      return clientes
    }
  }


  public leerArchivoInstrucciones(ruta: string, titulo: string) {
    try {
      //controla que exista el archivo
      if (fs.existsSync(ruta)) {
        //lee el archivo
        const instrucciones = fs.readFileSync(ruta, "utf-8");

        funciones.mensajeAlerta(`Instrucciones para ${titulo} `, "azul");
        console.log(`\n${instrucciones}`); //muetra el contenido del archivo
        console.log("\n \n");
        let caracter = rls.question(" Presione una tecla para continuar ...").blue;
        console.log("\n \n");
      } else {
        funciones.mensajeAlertaSinMarco(`\nNo se encontraron instrucciones para ${titulo}.`, "amarillo");
        let caracter = rls.question("\n Presione una tecla para continuar ...").blue;
      }
    } catch (e) {
      //otros tipos de errores menos frecuentes (como error de acceso)
      funciones.mensajeAlertaSinMarco(` ${(e as Error).message}`, "rojo");
    }

  }
}
