import { ChargesSocialesModel } from './ChargesSocialesModel';
import { FactureModel } from './FactureModel';
import { TvaModel } from './TvaModel';

export class SyntheseFacturationModel {

    constructor(facture: FactureModel) {
        this.facture = facture;
        this.tva = new TvaModel();
        this.chargesSociales = new ChargesSocialesModel();
        this.fillCharges();
    }

    public facture: FactureModel;
    public tva: TvaModel;
    public chargesSociales: ChargesSocialesModel;
    public chargesTotales: number;

    private fillCharges(): void {
        this.tva.montant = this.facture.montantHorsTaxe * this.tva.taux;
        this.chargesSociales.montant = this.chargesSociales.taux * this.facture.montantHorsTaxe;
        this.facture.montantTtc = this.facture.montantHorsTaxe + this.tva.montant;
    }

    private getChargesTotales(): number {
        // var total = this.facture.montantHorsTaxe - ;
        return 0;
    }
}