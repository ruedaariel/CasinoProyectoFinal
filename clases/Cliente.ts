export class Cliente {
    private dni: number;
    private nombre: string;
    private credito: number; 

    constructor (dni: number,nombre: string) {
        this.dni = dni;
        if (nombre!= undefined && nombre != "") {
            this.nombre = nombre.trim();
        }else {
            this.nombre = "Anonimo"
        }
        this.credito = 0;
    }
    public getDni():number {
        return this.dni
    }
    public setDni(dni:number):void {
        this.dni=dni;
    }
    public getNombre(): string {
        return this.nombre;
    }
    public setNombre(value: string) {
        if (value != undefined && value.trim() != "") {
            this.nombre = value.trim();
        }
    }
    public getACredito(): number {
        return this.credito;
    }
    public  setCredito(value: number) {
        if (value != undefined && value > 0) {
            this.credito = value;
        }

    }
    public mostrarCliente(): void {
        console.log("Nombre: "+ this.nombre + "Credito: " + this.credito);
    }


}