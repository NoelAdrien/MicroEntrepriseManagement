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
  @Output() reloadFactureMethod = new EventEmitter<boolean>();

  public dateDateFacturationForm: Date;
  public dateEncaissementForm: Date;

  ngOnInit(): void {
  }

  public addFacture(): void {
    this.setFacturationDates();
    this.facturationService.addFacture(this.syntheseFacture);
    this.reloadFactureMethod.next(true);
  }

  public updateFacture(): void {
    this.setFacturationDates();
    this.facturationService.updateFacture(this.syntheseFacture);
  }

  public formatDate(event: string, isDateFacturation: boolean): void {
    var dates: any[] = event.split('/');
    if (isDateFacturation) {
      this.dateDateFacturationForm = new Date(dates[2] as number, dates[1] as number - 1, dates[0] as number);
    } else {
      this.dateEncaissementForm = new Date(dates[2] as number, dates[1] as number - 1, dates[0] as number);
    }
  }

  private setFacturationDates(): void {
    this.syntheseFacture.facture.dateFacturation = this.dateDateFacturationForm;
    this.syntheseFacture.facture.dateEncaissement = this.dateEncaissementForm;
  }
}
