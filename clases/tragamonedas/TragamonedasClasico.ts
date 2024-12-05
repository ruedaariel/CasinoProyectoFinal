import { Tragamonedas } from "./Tragamonedas";
import * as funciones from "../../Funciones/funciones"

export class TragamonedasClasico extends Tragamonedas {
    private bonusExtras: number; //Esta variable determina cada cuantas jugadas puede tener un porcentaje extra
    private cantDeTiradas: number = 1; //Sumador de tiradas
    constructor() {
        super("Tragamonedas Clasico", 500, 10000, ["🥭", "🍎", "🥥", "🍈", "🍊", "🍌", "🍒", "🍇", "🍉", "🍍", "🍈", "🥝", "🍐", "🍓", "🫐  "], [[], [], []], "⭐", 3);
        this.bonusExtras = 3;
    }

    public pagoBonus(premio: number): number {
        funciones.mensajeAlerta(`Llevas ${this.cantDeTiradas} de ${this.bonusExtras} tiros. EL TERCERO SUMA UN PORCENTAJE AL PREMIO!!!`, "Rojo");

        // Lógica para aplicar los bonos extras
        let bonusGanado: number = 0;
        if (this.cantDeTiradas > 2) {
            this.cantDeTiradas = 1;
            // El bono otorga un porcentaje adicional al premio
            let porcentajeBono = Math.random() * 0.5; // Bono entre 0% y 50% de la apuesta
            bonusGanado = premio * parseFloat((porcentajeBono).toFixed(2));
            if (bonusGanado > 0) {
                funciones.mensajeAlerta(`GANASTE UN BONUS DEL  ${(porcentajeBono * 100).toFixed(0)}% SOBRE TU PREMIO!!!!`, "Amarillo");
                funciones.mensajeAlerta(`MONTO DEL BONUS $ ${bonusGanado.toFixed(0)} !!!!`, "Amarillo");
            }
        } else {
            this.cantDeTiradas += 1;
        }
        return Math.floor(bonusGanado);
    }

}