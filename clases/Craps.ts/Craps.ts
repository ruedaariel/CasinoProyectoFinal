export class Craps {
    private dado1: number = 0;
    private dado2: number = 0;
    private punto: number = 0;
    private cantidadTiradas: number = 0;
    private monto:number = 0;
    private gano: boolean = false;
    private apuestaMinima: number = 1000;

    public getCantidadTiradas(): number {
        return this.cantidadTiradas;
    }

    public getGano(): boolean {
        return this.gano;
    }

    private tirarDados(): void {
        this.dado1 = Math.floor(Math.random() * 6) + 1;
        this.dado2 = Math.floor(Math.random() * 6) + 1;
        console.log(`Dados: ${this.dado1} + ${this.dado2} = ${this.dado1 + this.dado2}`);
    }

    public getApuestaMinima(): number {
        return this.apuestaMinima;
    }
    public setApuestaMinima(value: number) {
        this.apuestaMinima = value;
    }

    private inicializarNuevoJuego():void {
        this.dado1 = 0;
        this.dado2 = 0;
        this.cantidadTiradas = 0;
        this.gano = false;
        this.punto = 0;
    }

    public jugar(): void {
        this.inicializarNuevoJuego();
        this.cantidadTiradas = 1;
        //primera jugada
        this.tirarDados();
        if (this.dado1 + this.dado2 == 7 || this.dado1 + this.dado2 == 11) {
            this.gano = true;
        } else {
            if (this.dado1 + this.dado2 == 2 || this.dado1 + this.dado2 == 3 || this.dado1 + this.dado2 == 12) {
                this.gano = false
            } else {
                this.punto = this.dado1 + this.dado2;
                console.log(`Punto establecido en: ${this.punto}`);
            }

            if (this.punto != 0) { // jugada de punto
                let salida: string = "SIGUE";
                do {
                    this.cantidadTiradas += 1;
                    this.tirarDados();
                    if (this.dado1 + this.dado2 == this.punto) {
                        this.gano = true;
                        salida = "GANO";
                    } else {
                        if (this.dado1 + this.dado2 == 7) {
                            this.gano = false;
                            salida = "PERDIO"
                        } else {
                            console.log(`Continúa tirando para alcanzar el punto ${this.punto}`);
                        }
                    }

                } while (salida == "SIGUE");

            }
            if (this.gano) {
                console.log(`Resultado: GANO`);
            } else {
                console.log(`Resultado: PERDIO`);
            }

        }
    }
}
    const dados: Craps = new Craps();
dados.jugar();
console.log(dados.getCantidadTiradas());
