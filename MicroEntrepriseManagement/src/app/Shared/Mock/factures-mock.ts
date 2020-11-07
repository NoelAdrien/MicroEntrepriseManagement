import { ChargesSocialesModel } from '../Models/ChargesSocialesModel';
import { FactureModel } from '../Models/FactureModel';
import { ImpotRevenuModel } from '../Models/ImpotRevenuModel';
import { SyntheseFacturationModel } from '../Models/SyntheseFacturationModel';
import { TvaModel } from '../Models/TvaModel';

export const FACTURES: SyntheseFacturationModel[] = [
    {
        id: '1',
        facture: new FactureModel('Facture Novembre 2019', new Date(2020, 0, 20), new Date(2019, 10, 25), 3500),
        chargesSociales: new ChargesSocialesModel(),
        tva: new TvaModel(),
        impotRevenu: new ImpotRevenuModel(),
        chargesTotales: 1,
        benefices: 1,
    },
    {
        id: '2',
        facture: new FactureModel('Facture décembre 2019', new Date(2020, 1, 20), new Date(2019, 10, 25), 4500),
        chargesSociales: new ChargesSocialesModel(),
        tva: new TvaModel(),
        impotRevenu: new ImpotRevenuModel(),
        chargesTotales: 1,
        benefices: 1,
    },
    {
        id: '3',
        facture: new FactureModel('Facture Janvier 2020', new Date(2020, 2, 20), new Date(2020, 0, 30), 5000),
            chargesSociales: new ChargesSocialesModel(),
            tva: new TvaModel(),
            impotRevenu: new ImpotRevenuModel(),
            chargesTotales: 1,
            benefices: 1,
    },
    {
        id: '4',
        facture: new FactureModel('Facture Février 2020', new Date(2020, 3, 30), new Date(2020, 1, 24), 3500),
        chargesSociales: new ChargesSocialesModel(),
        tva: new TvaModel(),
        impotRevenu: new ImpotRevenuModel(),
        chargesTotales: 1,
        benefices: 1,
    },
    {
        id: '5',
        facture: new FactureModel('Facture Mars 2020', new Date(2020, 4, 20), new Date(2020, 2, 24), 4210),
        chargesSociales: new ChargesSocialesModel(),
        tva: new TvaModel(),
        impotRevenu: new ImpotRevenuModel(),
        chargesTotales: 1,
        benefices: 1,
    }
];