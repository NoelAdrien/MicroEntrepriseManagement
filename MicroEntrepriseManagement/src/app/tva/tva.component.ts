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
  public facturesTrimestre: Array<SyntheseFacturationModel>;
  public selectedTrimestre: number;
  public totalTva: number;

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

}
