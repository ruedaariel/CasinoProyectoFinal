
import {Cliente} from '../Cliente';
import { BlackJack } from './BlackJack';
import * as funciones from "../../Funciones/funciones"
import 'colors';
import  * as readlineSync from 'readline-sync';

class MainBJ {
  static main() {
    // Crear instancias de los jugadores
    const jugador1 = new Cliente(11111,'Miguel');
    
   // Crear una instancia del juego
   const juego = new BlackJack();
   
   funciones.mensajeAlerta(`Bienvenido a Black Jack ${jugador1.getNombre()}`,"verde");
   let continuar:string=readlineSync.question("Presione ENTER para continuar");
   jugador1.setCredito(10000);    
   let condicion: number = 1;
   while (condicion>0) {
        juego.apostar(jugador1);
        condicion = readlineSync.questionInt("Si desea seguir apostando ingrese un número mayor a 0: ")
    }
        
  }
}
// Ejecutar el juego
MainBJ.main();
