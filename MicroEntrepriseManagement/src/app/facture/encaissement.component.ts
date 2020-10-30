import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { SyntheseFacturationModel } from '../shared/Models/SyntheseFacturationModel';
import { FacturationService } from '../shared/Services/facturation-service.service';

@Component({
  selector: 'app-encaissement',
  templateUrl: './encaissement.component.html',
  styleUrls: ['./encaissement.component.css']
})
export class EncaissementComponent implements OnInit {

  public syntheseFacturations: Array<SyntheseFacturationModel>;
  public selectedFacture: SyntheseFacturationModel;
  public isActionAdd: boolean;

  constructor(private facturationService: FacturationService) {
    this.facturationService.getFactures().subscribe(syntheseFactures => this.syntheseFacturations = syntheseFactures);
  }

  ngOnInit(): void {
  }

  public selectFactureForm(facture: SyntheseFacturationModel = null): void {
    this.isActionAdd = facture === null;
    if (facture === null) {
      facture = new SyntheseFacturationModel();
    }
    
    this.selectedFacture = facture;
  }
}
