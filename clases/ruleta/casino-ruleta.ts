import { Ruleta } from "./claseRuleta"
import { ApuestaRuleta } from "./Apuesta"

const ruleta:Ruleta = new Ruleta();

const apuestas: ApuestaRuleta[] = [];

let apuesta0: ApuestaRuleta = new ApuestaRuleta("numero","8",100);
let apuesta1: ApuestaRuleta = new ApuestaRuleta("numero","14",100);
let apuesta2: ApuestaRuleta = new ApuestaRuleta("numero","33",100);

apuestas.push(apuesta0);
apuestas.push(apuesta1);
apuestas.push(apuesta2);


console.clear();  
console.log("*********************************");
ruleta.calcularGanacia(apuestas);
console.log("*********************************");
