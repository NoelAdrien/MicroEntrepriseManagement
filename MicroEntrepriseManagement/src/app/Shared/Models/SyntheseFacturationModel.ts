import { ChargesSocialesModel } from './ChargesSocialesModel';
import { FactureModel } from './FactureModel';
import { ImpotRevenuModel } from './ImpotRevenuModel';
import { TvaModel } from './TvaModel';

export class SyntheseFacturationModel {

    constructor() {
        this.tva = new TvaModel();
        this.chargesSociales = new ChargesSocialesModel();
        this.impotRevenu = new ImpotRevenuModel();
    }

    public id: string;
    public facture: FactureModel;
    public tva: TvaModel;
    public chargesSociales: ChargesSocialesModel;
    public chargesTotales: number;
    public impotRevenu: ImpotRevenuModel;
    public benefices: number;
}