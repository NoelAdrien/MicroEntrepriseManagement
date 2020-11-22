import { Injectable } from '@angular/core';
import { FactureModel } from '../Models/FactureModel';
import { SyntheseFacturationModel } from '../Models/SyntheseFacturationModel';
import { Observable, of } from 'rxjs';
import { FACTURES } from '../Mock/factures-mock';

@Injectable({
  providedIn: 'root'
})
export class FacturationService {

  public syntheseFactures: Array<SyntheseFacturationModel>;
  constructor() {
    this.syntheseFactures = new Array<SyntheseFacturationModel>();
  }

  public getFactures(): Observable<Array<SyntheseFacturationModel>> {
    if (this.syntheseFactures.length > 0) {
      return of(this.syntheseFactures);
    }

    this.syntheseFactures = FACTURES;
    this.syntheseFactures.forEach(syntheseFacture => {
      this.fillMontantsFacture(syntheseFacture);
    })

    return of(this.syntheseFactures);
  }

  private fillMontantsFacture(syntheseFacture: SyntheseFacturationModel): void {
    syntheseFacture.tva.montant = syntheseFacture.facture.montantHorsTaxe * syntheseFacture.tva.taux;
    syntheseFacture.facture.montantTtc = syntheseFacture.facture.montantHorsTaxe + syntheseFacture.tva.montant;
    syntheseFacture.chargesSociales.montant = syntheseFacture.chargesSociales.taux * syntheseFacture.facture.montantHorsTaxe;
    syntheseFacture.impotRevenu.montant = syntheseFacture.facture.montantHorsTaxe * syntheseFacture.impotRevenu.taux;
    syntheseFacture.chargesTotales = syntheseFacture.tva.montant + syntheseFacture.chargesSociales.montant + syntheseFacture.impotRevenu.montant;
    syntheseFacture.benefices = syntheseFacture.facture.montantTtc - syntheseFacture.chargesTotales;
  }

  public addFacture(syntheseFacture: SyntheseFacturationModel): void {
    this.fillMontantsFacture(syntheseFacture);
    this.syntheseFactures.push(syntheseFacture);
  }

  public updateFacture(syntheseFacture: SyntheseFacturationModel): void {
    this.fillMontantsFacture(syntheseFacture);
    var indexDelete = this.syntheseFactures.findIndex(x => x.id === syntheseFacture.id);
    if (indexDelete > -1) {
      this.syntheseFactures.splice(indexDelete, 1);
    }
    this.syntheseFactures.push(syntheseFacture);
  }

  public deleteFacture(syntheseFacture: SyntheseFacturationModel): void {
    var indexDelete = this.syntheseFactures.findIndex(x => x.id === syntheseFacture.id);
    if (indexDelete > -1) {
      this.syntheseFactures.splice(indexDelete, 1);
    }
  }

  public getAnneeFactures(): Observable<Array<number>> {
    var anneeFactures = new Array<number>();
    this.syntheseFactures.forEach(syntheseFactures => {
      console.log('GET ANNEE FACTURES', syntheseFactures.facture.dateFacturation);
      var anneeFacture = syntheseFactures.facture.dateFacturation.getFullYear();
      var anneeEncaissement = syntheseFactures.facture.dateEncaissement.getFullYear();
      if (anneeFactures.filter(x => x === anneeFacture).length === 0) {
        anneeFactures.push(anneeFacture);
      }
      if (anneeFactures.filter(x => x === anneeEncaissement).length === 0) {
        anneeFactures.push(anneeEncaissement);
      }
    });
    anneeFactures.sort(((a, b) => b - a));

    return of(anneeFactures);
  }
}
