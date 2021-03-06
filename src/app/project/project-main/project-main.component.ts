import { Component, OnInit, Input } from '@angular/core';
import { ApibillService } from '../../api/api-bill.service';
import { Router } from '@angular/router';
import { ApiprojectService } from '../../api/api-project.service';
import { ApiQuotationService } from '../../api/api-quotation.service';
import { renderComponent } from "@angular/core/src/render3";


@Component({
  selector: 'app-project-main',
  templateUrl: './project-main.component.html',
  styleUrls: ['./project-main.component.sass']
})
export class ProjectMainComponent implements OnInit {
  @Input() Project: any;
  @Input() selected: any;
  @Input() Bill: any;
  @Input() Quotation: any;
  @Input() url: any;

  send = 'Envoyer';

  constructor(
    public apiBill: ApibillService,
    public apiQuotation: ApiQuotationService,
    public apiProject: ApiprojectService,
    public router: Router,
  ) {

  }


  ngOnInit() {

  }


  sendBill(id) {
    if (window.confirm('Confirmez-vous l\'envoi de la facture ?')) {
      this.apiBill.sendBill(this.selected.id).subscribe((data: {}) => {
        console.log(this.Project);
        this.send = 'Envoyé';
        this.selected.status_send = 1;
      });
    }

  }

  sendQuotation(id) {
    if (window.confirm('Confirmez-vous l\'envoi du devis ?')) {
      this.apiQuotation.sendQuotation(this.selected.id).subscribe((data: {}) => {
        console.log(this.Project);
        this.send = 'Envoyé';
        this.selected.status_send = 1;
      });
    }
  }

  updateRemaining(id) {
    this.Project.remaining = this.Project.remaining - this.selected.price_total;
    console.log(this.Project.remaining);
    console.log(this.Project)
      ;
    if (window.confirm('La facture a-t-elle bien été payé ?')) {

      this.selected.status = 0;

      this.selected.payment_period = new Date();
      console.log("testPaymentPeriod")
      console.log(this.selected.payment_period);




      this.apiProject.updateProject(this.Project.id, this.Project).subscribe((data: {}) => {
        console.log(this.Project);
      });
      this.apiBill.updateBill(this.selected.id, this.selected).subscribe((data: {}) => {
        console.log(this.selected);
      });
    }

  }

  emailReminder() {
    this.selected.email_reminder = new Date();

    this.apiBill.updateBill(this.selected.id, this.selected).subscribe((data: {}) => {
      console.log(this.selected);

    });

  }
  callReminder() {
    this.selected.call_reminder = new Date();

    this.apiBill.updateBill(this.selected.id, this.selected).subscribe((data: {}) => {
      console.log(this.selected);
    });
  }
  emailQReminder() {
    this.selected.email_reminder = new Date();

    this.apiQuotation.updateQuotation(this.selected.id, this.selected).subscribe((data: {}) => {
      console.log(this.selected);

    });

  }
  callQReminder() {
    this.selected.call_reminder = new Date();

    this.apiQuotation.updateQuotation(this.selected.id, this.selected).subscribe((data: {}) => {
      console.log(this.selected);
    });
  }
}
