import { Ruleta } from "./clases/ruleta/claseRuleta"
import { Apuesta } from "./clases/ruleta/Apuesta"
import { Cliente } from "./clases/Cliente"
import * as funciones from "./Funciones/funciones"
import "colors";
import * as rls from "readline-sync";

const ruleta:Ruleta = new Ruleta();
let jugador:Cliente = new Cliente(17342282,"Ariel");
jugador.setCredito(500);

const apuestas: Apuesta[] = [];

// let apuesta0: ApuestaRuleta = new Apuesta("numero","8",100);
// let apuesta1: ApuestaRuleta = new Apuesta("color","rojo",100);
// let apuesta2: ApuestaRuleta = new Apuesta("numero","33",100);

// apuestas.push(apuesta0);
// apuestas.push(apuesta1);
// apuestas.push(apuesta2);


console.clear();  
console.log("*********************************");
//ruleta.calcularGanacia(apuestas);
ruleta.comenzarAJugar(jugador);
console.log("*********************************");