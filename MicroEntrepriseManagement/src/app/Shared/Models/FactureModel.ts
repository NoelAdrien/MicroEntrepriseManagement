export class FactureModel {
    constructor(name: string, dateFacturation: Date, dateEncaissement: Date, montantHorsTaxe: number) {
        this.name = name;
        this.dateFacturation = dateFacturation;
        this.dateEncaissement = dateEncaissement;
        this.montantHorsTaxe = montantHorsTaxe;
    }
    public name: string;
    public dateFacturation: Date;
    public dateEncaissement: Date;
    public montantHorsTaxe: number;
    public montantTtc: number;
}