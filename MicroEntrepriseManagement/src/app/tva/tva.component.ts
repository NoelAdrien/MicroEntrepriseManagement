import { Component, OnInit } from '@angular/core';
import { SyntheseFacturationModel } from '../shared/Models/SyntheseFacturationModel';
import { FacturationService } from '../shared/Services/facturation-service.service';

@Component({
  selector: 'app-tva',
  templateUrl: './tva.component.html',
  styleUrls: ['./tva.component.css']
})
export class TvaComponent implements OnInit {

  public syntheseFacturations: Array<SyntheseFacturationModel>;
  public anneeFactures: Array<number>;
  public selectedYear: number;

  // Détails de la tva 
  public facturesTrimestre: Array<SyntheseFacturationModel>;
  public selectedTrimestre: number;
  public totalTva: number;
  public dateDeclarationTva: Date;

  constructor(private facturationService: FacturationService) {
    this.selectedYear = 0;
    this.selectedTrimestre = 1;
    this.facturesTrimestre = new Array<SyntheseFacturationModel>();
    this.loadFactures();
  }

  ngOnInit(): void {
  }

  public loadFactures(): void {
    this.syntheseFacturations = this.getFactures();
    this.fillAnneeFactures();
    this.applyFiltresTypeFacture();
    this.getFacturesTrimestre(1);
  }

  public getFactures(): Array<SyntheseFacturationModel> {
    var syntheseFactures = new Array<SyntheseFacturationModel>();
    this.facturationService.getFactures().subscribe(syntheseFacturesSource => syntheseFactures = syntheseFacturesSource);
    return syntheseFactures;
  }

  private fillAnneeFactures(): void {
    this.facturationService.getAnneeFactures().subscribe(anneeFactureSrc => this.anneeFactures = anneeFactureSrc);
    if (this.selectedYear === 0) {
      this.selectedYear = this.anneeFactures[0];
    }
  }

  public applyFiltresTypeFacture(): void {
    var filteredFactures = new Array<SyntheseFacturationModel>();
    this.syntheseFacturations.forEach(syntheseFacture => {
      if (syntheseFacture.facture.dateEncaissement.getFullYear() === this.selectedYear) {
        filteredFactures.push(syntheseFacture);
      }
    });

    this.syntheseFacturations = filteredFactures;
  }

  public getFacturesTrimestre(numeroTrimestre: number) {
    this.facturesTrimestre = new Array<SyntheseFacturationModel>();
    this.totalTva = 0;
    this.selectedTrimestre = numeroTrimestre;
    var bornesMonthTrimestreMin = (this.selectedTrimestre * 3) - 3;
    var bornesMonthTrimestreMax = (this.selectedTrimestre * 3) - 1;

    this.syntheseFacturations.forEach(syntheseFacture => {
      var month = syntheseFacture.facture.dateEncaissement.getMonth();
      if (month >= bornesMonthTrimestreMin && month <= bornesMonthTrimestreMax) {
        this.totalTva += syntheseFacture.tva.montant;
        this.facturesTrimestre.push(syntheseFacture);
      }
    });
  }

  public setTvaPayee(): void {
    this.facturesTrimestre.forEach(syntheseFacture => {
      syntheseFacture.tva.isPayee = true;
    });
  }

  public getInformationTva(factSynthese: SyntheseFacturationModel): string {
    var numMonth = factSynthese.facture.dateEncaissement.getMonth();
    switch (numMonth) {
      case 0:
        return `Déclaration TVA 4iem trimestre ${this.selectedYear - 1}`;
      case 3:
        return `Déclaration TVA 1er trimestre ${this.selectedYear}`;
      case 6:
        return `Déclaration TVA 2iem trimestre ${this.selectedYear}`;
      case 9:
        return `Déclaration TVA 3iem trimestre ${this.selectedYear}`;
      default:
        return '-';
    }
  }

}
