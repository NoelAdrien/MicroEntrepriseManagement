import { Component, Input, OnInit } from '@angular/core';
import { SyntheseFacturationModel } from '../shared/Models/SyntheseFacturationModel';
import { FacturationService } from '../shared/Services/facturation-service.service';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent implements OnInit {

  constructor(private facturationService: FacturationService) {
    this.syntheseFacture = new SyntheseFacturationModel();
  }

  @Input() syntheseFacture: SyntheseFacturationModel;
  @Input() isActionAdd: boolean;

  ngOnInit(): void {
  }

  public updateFacture(): void {
    var factures: SyntheseFacturationModel[];
    this.facturationService.getFactures().subscribe(syntheseFactures => factures = syntheseFactures);
  }

}
