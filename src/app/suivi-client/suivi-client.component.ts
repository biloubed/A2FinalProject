import { Component, OnInit } from '@angular/core';
import { ApibillService } from '../api/api-bill.service';
import { ApiprojectService } from "../api/api-project.service";
import { Bill } from '../api/class/bill';
import { Project } from '../api/class/project';


@Component({
  selector: 'app-suivi-client',
  templateUrl: './suivi-client.component.html',
  styleUrls: ['./suivi-client.component.sass']
})

export class SuiviClientComponent implements OnInit {
  Bill: any = [];
  Project: any = [];
  SingleArray: string[] = [];



  constructor(
    public api: ApibillService,
    public api2: ApiprojectService,
  ) { }

  ngOnInit() {
    this.loadProjects(); 


  }
  

  loadBills() {
    return this.api.getBills().subscribe((data: {}) => {
      this.Bill = data;
      this.Bill.Downpayment = this.Project.downpayment
    });
  }

  loadProjects() {
    return this.api2.getProjects().subscribe((data: {}) => {
      this.Project = data;
      this.loadBills();

      
      
    });
  }
  

  
  
}