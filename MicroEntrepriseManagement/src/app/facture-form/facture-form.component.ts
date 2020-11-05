import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() reloadFactureMethod = new EventEmitter<string>();

  ngOnInit(): void {
  }

  public addFacture(): void {
    this.facturationService.addFacture(this.syntheseFacture);
    this.reloadFactureMethod.emit();
  }

  public updateFacture(): void {
    this.facturationService.updateFacture(this.syntheseFacture);
  }

  public formatDate(event: string, isDateFacturation: boolean): void {
    var dates: any[] = event.split('/');
    if (isDateFacturation) {
      this.syntheseFacture.facture.dateFacturation = new Date(dates[2] as number, dates[1] as number - 1, dates[0] as number);
    } else {
      this.syntheseFacture.facture.dateEncaissement = new Date(dates[2] as number, dates[1] as number - 1, dates[0] as number);
    }
  }
}
