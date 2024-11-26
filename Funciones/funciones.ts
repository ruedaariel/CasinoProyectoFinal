import "colors";
import * as rls from "readline-sync";





// resuleve la logica de la seleccion de opciones conm manejo del error
// servicio => es un aregllo que define las opciones y su texto y sirve para pasarlo a
// pantalla menu para dibujarlo 

export function menuGenerico() {

  let opcion: string;
  let errorIngreso: boolean = true;
  console.clear();

  const servicios: string[] = ['1. Opcion 1',
    '2. Opcion 2',
    '3. Opcion 3',
    '4. Opcion 4',
    '5. Opcion 5',
    '0. Salir'];

  do {

    pantallaMenu(" Titulo general", servicios, 30, 40, 2);


    if (!errorIngreso) { lineaConRecuadroError(30, "Opción inválida. Por favor, reinteinte", 40, 2); }



    opcion = rls.question(igualoCadena("", 31, " ") + "Seleccione una de las opciones:".green);

    switch (opcion) {
      case "1":
        
        console.log("seleccionaste Opcion 1");
        
        break;
      case "2":
        console.log("seleccionaste Opcion 2");
        
        break;
      case "3":
        console.log("seleccionaste Opcion 3");
        
        break;
      case "4":
        console.log("seleccionaste Opcion 4");
        
        break;
      case "5":
        console.log("seleccionaste Opcion 5");
      case "0":
        //salir
  
        break;
      default:
        errorIngreso = false;
        console.clear();

        break;
    }
  } while (opcion !== "0");
}

// se invoca de esta forma => pantallaMenu(" Casino ", servicios, 30, 40, 2);
// " Casino " => es el titulo del menu
// 30 => 30 lugares desde el margen izquierdo
// 40 es el ancho del recuadro
// 2 => es el set de caracteres --- 1 => linea simple (|) o 2 => linea doble (║) 

export function pantallaMenu(titulo: string, opciones: string[], padIzquierdo: number, ancho: number, set: number) {

  // armo un cuadro con el menu de opciones
  lineaConRecuadro(padIzquierdo, titulo, ancho, set);
  cierreSuperior(padIzquierdo, ancho, set)
  opciones.forEach(element => { armaLinea(padIzquierdo, element, ancho, set) });
  cierreInferior(padIzquierdo, ancho, set);
  
}


// arma linea superior de cuadro
export function cierreSuperior(padIzquierdo: number, ancho: number, set: number) {

  // SET = 1 caracteres  de recueadro con linea simple
  // SET = 2 caracteres  de recueadro con linea doble

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "┌" + igualoCadena("─", ancho, "─") + "┐");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "╔" + igualoCadena("═", ancho, "═") + "╗");
  }
}


// arma linea inferior de cuadro
export function linea(padIzquierdo: number, ancho: number, set: number) {

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "" + igualoCadena("─", ancho, "─") + "");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "" + igualoCadena("═", ancho, "═") + "");
  }
}

// arma linea inferior de cuadro
export function cierreInferior(padIzquierdo: number, ancho: number, set: number) {

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "└" + igualoCadena("─", ancho, "─") + "┘");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "╚" + igualoCadena("═", ancho, "═") + "╝");
  }
}

// arma las lineas interna de un cuadro
export function armaLinea(padIzquierdo: number, texto: string, ancho: number, set: number) {

  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "│ " + igualoCadena(texto, ancho - 1, " ").green + "│");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "║ " + igualoCadena(texto, ancho - 1, " ").green + "║");
  }

}


// genera un texto enmarcado    PadIzquierdo = separacion del margen izquierdo
//                              texto = lo que se quiere mostrar
//                              ancho = cuantocaracteres de ancho debe tener
//                              set = 1 => linea simple | o 2 => linea doble ║                     
export function lineaConRecuadro(padIzquierdo: number, texto: string, ancho: number, set: number) {

  //igualoCadena(texto,ancho," ");
  cierreSuperior(padIzquierdo, ancho, set);
  armaLinea(padIzquierdo, texto, ancho, set);
  cierreInferior(padIzquierdo, ancho, set);

}

// arma las lineas interna de un cuadro
export function armaLineaError(padIzquierdo: number, texto: string, ancho: number, set: number) {

    if (set === 1) {
      console.log(igualoCadena(" ", padIzquierdo, " ") + "│ " + igualoCadena(texto, ancho - 1, " ").red + "│");
    }
    else {
      console.log(igualoCadena(" ", padIzquierdo, " ") + "║ " + igualoCadena(texto, ancho - 1, " ").red + "║");
    }
  
  }
    
  // genera una linea enmarcada
  export function lineaConRecuadroError(padIzquierdo: number, texto: string, ancho: number, set: number) {
  
    cierreSuperior(padIzquierdo, ancho, set);
    armaLineaError(padIzquierdo, texto, ancho, set);
    cierreInferior(padIzquierdo, ancho, set);
  
  }

export function separador(padIzquierdo: number, ancho: number, set: number) {


  if (set === 1) {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "├" + igualoCadena("─", ancho, "─") + "┤");
  }
  else {
    console.log(igualoCadena(" ", padIzquierdo, " ") + "╠" + igualoCadena("═", ancho, "═") + "╣");
  }

}

//---------------   mensaje alerta ----------------

// genera un texto enmarcado ajustandolo al ancho del mismo
// color => pude cambiar el color a "rojo" "verde" "azul" "amarillo"
// el mensaje se centra en el lugar 50 de la linea

export function mensajeAlerta(mensaje:string, color: string): void {

  let ancho = mensaje.length;
  let set: number = 2;
  let padIzquierdo: number = 20;

  if (ancho % 2 != 0) {ancho +=1;mensaje = mensaje+" ";}
  else {padIzquierdo = 50 - ancho/2;}

  //mensaje = igualoCadena(mensaje,ancho,"").green;
 
  if (color.toLocaleLowerCase().trim() === "rojo") { mensaje = igualoCadena(mensaje,ancho,"").red;}
  if (color.toLocaleLowerCase().trim() === "verde") { mensaje = igualoCadena(mensaje,ancho,"").green;}
  if (color.toLocaleLowerCase().trim() === "azul") { mensaje = igualoCadena(mensaje,ancho,"").blue;}
  if (color.toLocaleLowerCase().trim() === "amarillo") { mensaje = igualoCadena(mensaje,ancho,"").yellow;}

  padIzquierdo = 50 - ancho/2;

  if (set === 1){
      console.log(igualoCadena(" ", padIzquierdo, " ")+"┌" + igualoCadena("─", ancho+2 ,"─") + "┐");}
  else {
      console.log(igualoCadena(" ", padIzquierdo, " ")+"╔" + igualoCadena("═", ancho+2,"═") + "╗");
  }    

  // armos linea de mensaje
  if (set === 1){
      console.log(igualoCadena(" ", padIzquierdo, " ") + "│ " + mensaje + " │");}
  else {
      console.log(igualoCadena(" ", padIzquierdo, " ") + "║ " + mensaje + " ║");}

  // arma linea inferior de cuadro
  
  if (set === 1){
      console.log(igualoCadena(" ", padIzquierdo, " ")+"└" + igualoCadena("─", ancho+2 ,"─") + "┘");}
  else {
      console.log(igualoCadena(" ", padIzquierdo, " ")+"╚" + igualoCadena("═", ancho+2 ,"═") + "╝");}

}

// justifica ancho de cualquier linea a un valor deseado
export function igualoCadena(cadena: string, largo: number, caracter: string): string {

  let cadenaNormalizada = cadena.padEnd(largo, caracter);

  return cadenaNormalizada;

}

export function dibujaUnDado(dado1:number, dado2:number): void {

  const todosLosDados:string [][] = [["╔════╦════╦════╗",
                                      "║    ║    ║    ║",
                                      "╠════╬════╬════╣",
                                      "║    ║ ██ ║    ║",
                                      "╠════╬════╬════╣",
                                      "║    ║    ║    ║",
                                      "╚════╩════╩════╝"],
                                     ["╔════╦════╦════╗",
                                      "║ ██ ║    ║    ║",
                                      "╠════╬════╬════╣",
                                      "║    ║    ║    ║",
                                      "╠════╬════╬════╣",
                                      "║    ║    ║ ██ ║",
                                      "╚════╩════╩════╝"],
                                     ["╔════╦════╦════╗",
                                      "║ ██ ║    ║    ║",
                                      "╠════╬════╬════╣",
                                      "║    ║ ██ ║    ║",
                                      "╠════╬════╬════╣",
                                      "║    ║    ║ ██ ║",
                                      "╚════╩════╩════╝"],
                                     ["╔════╦════╦════╗",
                                      "║ ██ ║    ║ ██ ║",
                                      "╠════╬════╬════╣",
                                      "║    ║    ║    ║",
                                      "╠════╬════╬════╣",
                                      "║ ██ ║    ║ ██ ║",
                                      "╚════╩════╩════╝"],
                                      ["╔════╦════╦════╗",
                                       "║ ██ ║    ║ ██ ║",
                                       "╠════╬════╬════╣",
                                       "║    ║ ██ ║    ║",
                                       "╠════╬════╬════╣",
                                       "║ ██ ║    ║ ██ ║",
                                       "╚════╩════╩════╝"],
                                       ["╔════╦════╦════╗",
                                        "║ ██ ║    ║ ██ ║",
                                        "╠════╬════╬════╣",
                                        "║ ██ ║    ║ ██ ║",
                                        "╠════╬════╬════╣",
                                        "║ ██ ║    ║ ██ ║",
                                        "╚════╩════╩════╝"]]
  
  
  
  const bordeSuperior1: string =   "┌────┬────┬────┐";
  
  const primeraLinea1: string =    "│ ██ │ ██ │ ██ │";
  
  const lineaInternedia1: string = "├────┼────┼────┤";
  
  const segundaLInea1:string =     "│ ██ │ ██ │ ██ │";
  
  
  const teceraLinea1: string =     "│ ██ │ ██ │ ██ │";
  
  const ultimaLinea1: string =     "└────┴────┴────┘";
  
  
     console.clear();
  
  
  console.log("                               "+"************************************");
  
  
  
  
  
      const todosLosDadosAux:string [][] = [...todosLosDados];
      const dadoUno:string[] = [...todosLosDadosAux[dado1-1]];
      const dadoDos:string[] = [...todosLosDadosAux[dado2-1]];
  
  
      for (let i = 0; i < dadoUno.length; i++){
  
          console.log("                               "+dadoUno[i]+ "    " + dadoDos[i]);
          
  
      }
  
  }
  
  import * as readlineSync from 'readline-sync';

export function validarNumeroEntre(cartel:string,min: number, max: number, averificar:number): number {
    let numero: number;
    let errorEntrada: boolean = true;

    
    while(true) {
        console.clear();

        mensajeAlerta(cartel,"azul");

        // para evitar el scroll indefinido usamos una variable bool 
        if (!errorEntrada) {
           
            mensajeAlerta("Ingreso invalido... reintente por favor","rojo");
            errorEntrada = true;
        }

        numero = rls.questionInt(igualoCadena("", 31, " ") + "Ingrese el valor: ".green);

        if (numero >= averificar || averificar < min) {
          cartel = `No dispone de crédito para realizar una apuesta de $${numero} su saldo máximo es $${averificar}`;
          errorEntrada = false
        }

        if (numero >= min && numero <= max ) { break;} 
        errorEntrada = false;
        console.clear();

    } 

    //console.clear();
    return numero
}




export function stop(): void {

  let pausa:string = rls.question("Pulsando una tecla sigue ...  ".green);
}

// valida la entrada de dos/tres cadenas
export function ingresarString(cartel: string, cad1:string, cad2:string, cad3?:string): string {
  let cadena: string = "";
  let errorEntrada: boolean = true;

  do {
      console.clear();
      // para evitar el scroll indefinido usamos una variable bool 
      if (!errorEntrada) {
          
          mensajeAlerta("Nombre inválido. Vuelva a Ingresar","rojo");
      }

      cadena = rls.question(igualoCadena("", 31, " ") + `Ingrese  ${cartel} : `.green); 



      if (cad1) { errorEntrada = false;}

  } while (!cad1);
  
  console.clear();
  return cadena;
}