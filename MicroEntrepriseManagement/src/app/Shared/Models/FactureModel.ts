export class FactureModel {
    constructor() {
    }
    public name: string;
    public dateFacturation: Date;
    public dateEncaissement: Date;
    public montantHorsTaxe: number;
    public montantTtc: number;
}