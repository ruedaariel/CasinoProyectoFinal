
export class Carta {
    private valor:string;
    private palo:string;

    constructor (valor:string,palo:string) {
            this.valor=valor;
            this.palo=palo;        
    }
    public getValor():string{
            return this.valor;
    }
    public setValor(valor:string):void {
        this.valor=valor;
      }
      public getPalo():string{
        return this.palo;
}
     public setPalo(palo:string):void {        
            this.palo=palo;
  }        
    
}