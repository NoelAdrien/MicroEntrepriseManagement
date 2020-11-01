import { Injectable } from '@angular/core';
import { FactureModel } from '../Models/FactureModel';
import { SyntheseFacturationModel } from '../Models/SyntheseFacturationModel';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturationService {

  public syntheseFactures: Array<SyntheseFacturationModel>;
  constructor() {
    this.syntheseFactures = new Array<SyntheseFacturationModel>();
   }

  public getFactures(): Observable<Array<SyntheseFacturationModel>> {
    this.syntheseFactures = new Array<SyntheseFacturationModel>();

    var syntheseFacturation = new SyntheseFacturationModel();
    syntheseFacturation.id = '1';
    syntheseFacturation.facture = new FactureModel();
    syntheseFacturation.facture.name = 'Facture Novembre 2019';
    syntheseFacturation.facture.dateFacturation = new Date(2019, 10, 25);
    syntheseFacturation.facture.dateEncaissement = new Date(2020, 0 , 20);
    syntheseFacturation.facture.montantHorsTaxe = 3500;
    this.syntheseFactures.push(syntheseFacturation);

    var syntheseFacturation = new SyntheseFacturationModel();
    syntheseFacturation.id = '2';
    syntheseFacturation.facture = new FactureModel();
    syntheseFacturation.facture.name = 'Facture décembre 2019';
    syntheseFacturation.facture.dateFacturation = new Date(2019, 11, 25);
    syntheseFacturation.facture.dateEncaissement = new Date(2020, 1, 20);
    syntheseFacturation.facture.montantHorsTaxe = 4500;
    this.syntheseFactures.push(syntheseFacturation);
    
    var syntheseFacturation = new SyntheseFacturationModel();
    syntheseFacturation.id = '3';
    syntheseFacturation.facture = new FactureModel();
    syntheseFacturation.facture.name = 'Facture Janvier 2020';
    syntheseFacturation.facture.dateFacturation = new Date(2020, 0, 30);
    syntheseFacturation.facture.dateEncaissement = new Date(2020, 2, 20);
    syntheseFacturation.facture.montantHorsTaxe = 5000;
    this.syntheseFactures.push(syntheseFacturation);

    var syntheseFacturation = new SyntheseFacturationModel();
    syntheseFacturation.id = '4';
    syntheseFacturation.facture = new FactureModel();
    syntheseFacturation.facture.name = 'Facture Février 2020';
    syntheseFacturation.facture.dateFacturation = new Date(2020, 1, 24);
    syntheseFacturation.facture.dateEncaissement = new Date(2020, 3, 30);
    syntheseFacturation.facture.montantHorsTaxe = 3500;
    this.syntheseFactures.push(syntheseFacturation);

    var syntheseFacturation = new SyntheseFacturationModel();
    syntheseFacturation.id = '5';
    syntheseFacturation.facture = new FactureModel();
    syntheseFacturation.facture.name = 'Facture Mars 2020';
    syntheseFacturation.facture.dateFacturation = new Date(2020, 2, 24);
    syntheseFacturation.facture.dateEncaissement = new Date(2020, 3, 20);
    syntheseFacturation.facture.montantHorsTaxe = 4210;
    this.syntheseFactures.push(syntheseFacturation);

    this.syntheseFactures.forEach(syntheseFacture => {
      this.fillMontantsFacture(syntheseFacture);
    })

    console.log('facturation service LENGTH :', this.syntheseFactures.length)
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
}
