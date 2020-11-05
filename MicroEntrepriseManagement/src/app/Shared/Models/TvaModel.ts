export class TvaModel {

    constructor() {
        this.taux = 0.2;
        this.isPayee = false;
    }

    public montant: number;
    public taux: number;
    public isPayee: boolean;
}