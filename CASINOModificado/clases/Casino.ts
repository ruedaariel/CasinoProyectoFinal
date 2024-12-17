import { Juego } from "./juego";
import { TragamonedasClasico } from "./tragamonedas/TragamonedasClasico";
import { TragamonedasTematico } from "./tragamonedas/TragamonedasTematico";
import { BlackJack } from "./Blackjack2/blackjack";
import { Ruleta } from "./ruleta/Ruleta";
import { PaseIngles } from "./Dados/PaseIngles";
import { Cliente } from "./Cliente";
import { GestionClientes } from "./GestionClientes"
import * as rls from "readline-sync";
import * as funciones from "../Funciones/funciones";
import 'colors';
import * as fs from "fs";
import { FabricaDeJuego } from "./FabricaDeJuego";




export class Casino {
 
  private juegos: Juego[] = [];
  private gestionClientes: GestionClientes;

  constructor() {
    const fabrica: FabricaDeJuego = new FabricaDeJuego(); //VER SI ESTA BIEN Y SI SE HACE ACA????
     this.gestionClientes = new GestionClientes(); 
     try {
      this.juegos.push(fabrica.crearJuego("TRAGAMONEDASCLASICO"));
      this.juegos.push(fabrica.crearJuego("TRAGAMONEDASTEMATICO"));
      this.juegos.push(fabrica.crearJuego("BLACKJACK"));
      this.juegos.push(fabrica.crearJuego("RULETA"));
      this.juegos.push(fabrica.crearJuego("PASEINGLES"));
     }
    catch (error) {console.log((error as Error).message)}
  }

  public abrirCasino(): void {
    let jugador: Cliente | number;
    let condicion: string = "";

    //carga los datos desde el archivo
    // ****************************************** ENCAPSULAMIENTO (creo que esto está bien) ******************************
    this.gestionClientes.setClientes(this.gestionClientes.leeDatosCliente("./clases/datos/clientes.txt"));

    funciones.mensajeAlerta("          🃏    BIENVENIDOS al CASINO     🃏          ", "verde");
//aca necesito pasarle el arreglo original, para que pueda hacer un push del nuevo cliente
    jugador = this.gestionClientes.ingresarCliente(this.gestionClientes.getClientes());
    if (jugador instanceof Cliente) {
      condicion = rls.question(
        funciones.igualoCadena("", 31, " ") +
        `\n Presione una tecla para continuar ...`.green);

      //este menu permite acceder a las distintas opciones de casino
      this.mostrarMenu(jugador);
    }


    //Cuando salgo, grabo los datos de los clientes
   
    this.gestionClientes.grabaDatos("./clases/datos/clientes.txt", this.gestionClientes.getClientes());
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
        funciones.lineaConRecuadroError(30, "Opción inválida. Reintente", 40, 2);
        errorIngreso = true;
      }
      opcion = rls.question(funciones.igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green);
      condicion = "1";
      console.clear();

      switch (opcion) {
        case "1":
          funciones.mensajeAlerta(`          🍒    BIENVENIDO ${jugador.getNombre()} A TRAGAMONEDAS CLASICO    🍒          `, "verde");
          this.leerArchivoInstrucciones("./clases/datos/tragamonedas.txt", "Tragamonedas");
          this.repetirUnJuego(0, jugador);
          break;
        case "2":
          this.leerArchivoInstrucciones("./clases/datos/tragamonedas.txt", "Tragamonedas");
          funciones.mensajeAlerta(`          🍀    BIENVENIDO ${jugador.getNombre()} A TRAGAMONEDAS TEMATICO    🍀         `, "verde");
          this.repetirUnJuego(1, jugador);
          break;
        case "3":
          funciones.mensajeAlerta(`          🃏    BIENVENIDO ${jugador.getNombre()} A BLACKJACK    🃏          `, "verde");
          this.leerArchivoInstrucciones("./clases/datos/blackJack.txt", "Blackjack");
          this.repetirUnJuego(2, jugador);
          break;
        case "4":
          funciones.mensajeAlerta(`              BIENVENIDO ${jugador.getNombre()} A RULETA              `, "verde");
          this.leerArchivoInstrucciones("./clases/datos/ruleta.txt", "Ruleta");
          this.repetirUnJuego(3, jugador);

          break;
        case "5":
          funciones.mensajeAlerta(`          🎲    BIENVENIDO ${jugador.getNombre()} A PASE INGLES    🎲          `, "verde");
          this.leerArchivoInstrucciones("./clases/datos/paseIngles.txt", "Pase Ingles");
          this.repetirUnJuego(4, jugador);
          break;
        case "6":
          funciones.mensajeAlerta(`          💵    BIENVENIDO ${jugador.getNombre()} A CARGAR CREDITO    💵          `, "verde");
          this.gestionClientes.cargarCredito(jugador);
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
          funciones.mensajeAlertaSinMarco(`      🃏   GRACIAS ${jugador.getNombre()} POR JUGAR EN NUESTRO CASINO    🃏      `, "verde")
          funciones.mensajeAlertaSinMarco("\n                             ¡Hasta la próxima! 🎩✨", "amarillo");
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

      if (this.juegos[indice].verificarCredito(jugador)) {


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
      else { condicion = "0"; }

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
