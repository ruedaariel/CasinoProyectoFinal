import { Tragamonedas } from "./Tragamonedas";
import * as funciones from "../../Funciones/funciones"

export class TragamonedasTematico extends Tragamonedas {
    private mediaParaBonusExtras: number; //Esta variable determina la media para calcular un premio extra del 50 % del premio obtenido

    constructor() {
        super("Tragamonedas Tematico", 10000, 1000000, ["🦒", "🐵","🐶","🐺","🦊","🦝","🐱","🦁","🐯","🐷","🐮","🐭","🐰","🐹","🐧","🐻","🦉"], [[], [], [], [], []], "👑", 3);
        this.mediaParaBonusExtras = 10
    }
    pagoBonus(premio: number): number{
        // Lógica para aplicar los bonos extras
        let bonusGanado: number = 0;
        let mediaBono: number = Math.random() * this.mediaParaBonusExtras;
        //Para que no entre muy seguido a dar un 50 % de premio divido por 1.2
        if (mediaBono > this.mediaParaBonusExtras/1.2) {
            // El bono otorga un porcentaje adicional del 50 % al premio
            bonusGanado = premio * 0.5;
            if (bonusGanado>0){
                funciones.mensajeAlerta(`GANASTE UN BONUS DE 50 % DE $ ${bonusGanado.toFixed(0)}`,"Amarillo");
            }
        }
        return Math.floor(bonusGanado);
    }
}