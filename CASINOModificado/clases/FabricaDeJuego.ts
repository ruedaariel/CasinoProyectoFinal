import { BlackJack } from "./Blackjack2/blackjack";
import { PaseIngles } from "./Dados/PaseIngles";
import { Juego } from "./juego";
import { Ruleta } from "./ruleta/Ruleta";
import { TragamonedasClasico } from "./tragamonedas/TragamonedasClasico";
import { TragamonedasTematico } from "./tragamonedas/TragamonedasTematico";

export class FabricaDeJuego {
    public crearJuego(tipo:string):Juego {
        switch (tipo) {
            case "TRAGAMONEDASCLASICO" :
                return new TragamonedasClasico();
                case "TRAGAMONEDASTEMATICO":
                    return new TragamonedasTematico();
                case "RULETA":
                    return new Ruleta();
                case "BLACKJACK": 
                return new BlackJack();
                case "PASEINGLES":
                    return new PaseIngles();
                default:
                    throw new Error("Tipo de juego no soportado " + tipo);
            }
       
        }
    }