export class FactureModel {
    constructor(name?: string, dateEncaissement?: Date, dateFacturation?: Date, montantHt?: number) {
        this.name = name || "";       
        this.dateEncaissement = dateEncaissement || new Date();
        this.dateFacturation = dateFacturation || new Date();
        this.montantHorsTaxe = montantHt || 0;
    };
    public name: string;
    public dateEncaissement: Date;
    public dateFacturation: Date;
    public montantHorsTaxe: number;
    public montantTtc: number;
}