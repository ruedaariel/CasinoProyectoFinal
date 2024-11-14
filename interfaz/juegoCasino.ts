export interface JuegoCasino {
    realizarApuesta(valor: number): string;
    pagar():void;
    apostar():void;
};