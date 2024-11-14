// Tipo de apuesta que un jugador puede realizar
export class ApuestaRuleta {
    
    // tipo puede ser "numero"  "color" "docena" "parOImpar"
    private tipo: string = "";
    private valor: string = ""; // El valor depende del tipo de apuesta number, string, string
    private cantidadApostada: number = 0; // Cantidad apostada

    public constructor (tipo: string, valor: string, cantidadApostada: number){

      this.tipo = tipo;
      this.valor = valor;
      this.cantidadApostada = cantidadApostada;

    }

  public setTipo (tipo:string): void {

    this.tipo = tipo;

  }
  public setValor (valor:string): void {

    this.valor = valor;

  }

  public setCantidadApostada (cantidadApostada:number): void {

    this.cantidadApostada = cantidadApostada;

  }

  public getTipo (): string {

    return this.tipo;

  }
  public getValor (): string {

    return this.valor;

  }
  
  public getCantidadApostada (): number {

    return this.cantidadApostada;

  }









  }