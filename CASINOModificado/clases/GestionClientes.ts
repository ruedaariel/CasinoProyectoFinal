import { Cliente } from "./Cliente";
import * as rls from "readline-sync";
import * as fs from "fs";
import * as funciones from "../Funciones/funciones";

export class GestionClientes {
  private clientes: Cliente[] = [];

  public getClientes(): Cliente[] {
    return this.clientes;
  }

  public setClientes(clientes:Cliente[]):void {
    this.clientes=clientes;
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

  public hacerAltaCliente(dni: number, arregloClientes: Cliente[]): Cliente {
    const nombre: string = this.ingresarNombre();
    const nuevoCliente = new Cliente(dni, nombre);
    arregloClientes.push(nuevoCliente);
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
// ******************************************* dicen que usar | no esta bien .... como se podria resolver? ******************
 
public ingresarCliente(arregloClientes: Cliente[]): Cliente | number {
    let dni: number = this.ingresarDni();
    let jugador: Cliente;
    let clienteIndex: number = this.existeDni(dni, arregloClientes);
    if (dni !== 0) { //controla que no quiera salir
      if (clienteIndex !== -1) { //Cliente encontrado
        jugador = arregloClientes[clienteIndex];
        funciones.mensajeAlertaSinMarco("Cliente encontrado:\n ", "azul");
        funciones.mensajeAlerta(jugador.mostrarCliente(), "azul");
      } else { //Carga de cliente nuevo
        jugador = this.hacerAltaCliente(dni, arregloClientes);
        funciones.mensajeAlerta("Cliente guardado ", "azul");
      }
      return jugador
    } else {
      return 0
    }
  }
}