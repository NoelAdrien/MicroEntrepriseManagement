import { Injectable } from '@angular/core';
import { FactureModel } from '../Models/FactureModel';
import { SyntheseFacturationModel } from '../Models/SyntheseFacturationModel';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturationService {

  constructor() { }

  public getFactures(): Observable<Array<SyntheseFacturationModel>> {
    var syntheseFacturations: Array<SyntheseFacturationModel> = new Array<SyntheseFacturationModel>();
    syntheseFacturations.push(
      new SyntheseFacturationModel(
        '1', new FactureModel('Facture Janvier 2020', new Date(2020, 0, 30), new Date(2020, 1, 20), 5000)
      ),
      new SyntheseFacturationModel(
        '2', new FactureModel('Facture Février 2020', new Date(2020, 1, 24), new Date(2020, 2, 20), 3500)
      ),
      new SyntheseFacturationModel(
        '3', new FactureModel('Facture Mars 2020', new Date(2020, 2, 24), new Date(2020, 3, 20), 4210)
      )
    );

    this.fillMontantFacture(syntheseFacturations);

    return of(syntheseFacturations);
  }

  private fillMontantFacture(syntheseFacturations: Array<SyntheseFacturationModel>): void {
    syntheseFacturations.forEach(syntheseFacture => {
      syntheseFacture.tva.montant = syntheseFacture.facture.montantHorsTaxe * syntheseFacture.tva.taux;
      syntheseFacture.facture.montantTtc = syntheseFacture.facture.montantHorsTaxe + syntheseFacture.tva.montant;
      syntheseFacture.chargesSociales.montant = syntheseFacture.chargesSociales.taux * syntheseFacture.facture.montantHorsTaxe;
      syntheseFacture.impotRevenu.montant = syntheseFacture.facture.montantHorsTaxe * syntheseFacture.impotRevenu.taux;
      syntheseFacture.chargesTotales = syntheseFacture.tva.montant + syntheseFacture.chargesSociales.montant + syntheseFacture.impotRevenu.montant; 
      syntheseFacture.benefices = syntheseFacture.facture.montantTtc - syntheseFacture.chargesTotales;
    });
  }
}
