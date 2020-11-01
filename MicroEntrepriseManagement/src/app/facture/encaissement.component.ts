import { Component, OnInit } from '@angular/core';
import { SyntheseFacturationModel } from '../shared/Models/SyntheseFacturationModel';
import { FacturationService } from '../shared/Services/facturation-service.service';

@Component({
  selector: 'app-encaissement',
  templateUrl: './encaissement.component.html',
  styleUrls: ['./encaissement.component.css']
})
export class EncaissementComponent implements OnInit {

  public syntheseFacturations: Array<SyntheseFacturationModel>;
  public anneeFactures: Array<number>;
  public selectedFacture: SyntheseFacturationModel;
  public isActionAdd: boolean;
  public selectedYear: number;
  public isDateEncaissement: boolean;

  constructor(private facturationService: FacturationService) {
    this.isDateEncaissement = false;
    this.selectedYear = 0;
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

  public selectFactureForm(facture: SyntheseFacturationModel = null): void {
    this.isActionAdd = facture == null;
    if (facture === null) {
      facture = new SyntheseFacturationModel();
    }

    this.selectedFacture = facture;
  }

  public deleteFacture(syntheseFacture: SyntheseFacturationModel): void {
    this.facturationService.deleteFacture(syntheseFacture);
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
      if (this.isDateEncaissement && syntheseFacture.facture.dateEncaissement.getFullYear() === this.selectedYear) {
        filteredFactures.push(syntheseFacture);
      }
      if (!this.isDateEncaissement && syntheseFacture.facture.dateFacturation.getFullYear() === this.selectedYear) {
        filteredFactures.push(syntheseFacture);
      }
    });

    this.syntheseFacturations = filteredFactures;
  }
}
