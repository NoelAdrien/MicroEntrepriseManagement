import { Component, OnInit } from '@angular/core';
import { monthNames } from '../shared/Models/MonthNames';
import { SyntheseFacturationModel } from '../shared/Models/SyntheseFacturationModel';
import { FacturationService } from '../shared/Services/facturation-service.service';
import { pieChartConst } from './charts/pieChart-const';
import { verticalBarConst } from './charts/vertical-bar-const';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  // barres verticales factures HT
  public facturesHtBar = verticalBarConst;
  public syntheseFacturesHtVerticalBar: Array<SyntheseFacturationModel>;
  public selectedYear: number;
  public anneeFactures: Array<number>;
  public isDateFacturation: boolean;

  // pie bénéfices
  public beneficesCharts = pieChartConst;
  public syntheseFacturesBenefices: Array<SyntheseFacturationModel>;

  constructor(private factureService: FacturationService) {
    this.selectedYear = 0;
    this.isDateFacturation = false;
    this.getBeneficesData();
    this.factureHtVerticalBar();
  }

  ngOnInit(): void {
  }

  public factureHtVerticalBar() {
    this.facturesHtBar.data = [];

    this.factureService.getFactures().subscribe(facturesResults => this.syntheseFacturesHtVerticalBar = facturesResults);
    this.fillAnneeFactures();
    this.applyFiltresTypeFacture();

    this.syntheseFacturesHtVerticalBar.forEach(syntheseFacture => {
      this.facturesHtBar.data.push(
        {
          "name": this.isDateFacturation ?
            monthNames[syntheseFacture.facture.dateFacturation.getMonth()] :
            monthNames[syntheseFacture.facture.dateEncaissement.getMonth()],
          "value": syntheseFacture.facture.montantHorsTaxe
        }
      );
    });
  }

  private fillAnneeFactures(): void {
    this.factureService.getAnneeFactures().subscribe(anneeFactureSrc => this.anneeFactures = anneeFactureSrc);
    if (this.selectedYear === 0) {
      this.selectedYear = this.anneeFactures[0];
    }
  }

  public applyFiltresTypeFacture(): void {
    var filteredFactures = new Array<SyntheseFacturationModel>();
    this.syntheseFacturesHtVerticalBar.forEach(syntheseFacture => {
      if (this.isDateFacturation && syntheseFacture.facture.dateFacturation.getFullYear() === this.selectedYear) {
        filteredFactures.push(syntheseFacture);
      }
      if (!this.isDateFacturation && syntheseFacture.facture.dateEncaissement.getFullYear() === this.selectedYear) {
        filteredFactures.push(syntheseFacture);
      }
    });

    this.syntheseFacturesHtVerticalBar = filteredFactures;
  }

  public getBeneficesData() {
    this.factureService.getFactures().subscribe(facturesResults => this.syntheseFacturesBenefices = facturesResults);
    this.beneficesCharts.data = [];
    var benefices = 0;
    var tva = 0;
    var chargesSociales = 0;
    var impotRevenu = 0;
    this.syntheseFacturesBenefices.forEach(syntheseFacture => {
      benefices += syntheseFacture.benefices;
      tva += syntheseFacture.tva.montant;
      chargesSociales += syntheseFacture.chargesSociales.montant;
      impotRevenu += syntheseFacture.impotRevenu.montant;
    });

    this.beneficesCharts.data = [
      {
        "name": "Bénéfices",
        "value": benefices
      },
      {
        "name": "TVA",
        "value": tva
      },
      {
        "name": "charges sociales",
        "value": chargesSociales
      },
      {
        "name": "Impôt revenus",
        "value": impotRevenu
      },
    ];
  }
}
