import { Component, OnInit } from '@angular/core';
import { ApiprojectService } from '../api/api-project.service'

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.sass']
})
export class LandingPageComponent implements OnInit {
  Project: any = [];
  OnGoing: any = [];
  Archived: any = [];
  Problems: any = [];

  constructor(private api: ApiprojectService) { }

  ngOnInit() {
    this.loadProject()

  }
  loadProject() {
    return this.api.getProjects().subscribe((data: {}) => {
      this.Project = data;
      console.log(this.Project)
      this.getOngoing()
      this.getArchived()
      this.getProblems()
    })
  }
  getOngoing() {
    console.log(this.Project);
    for (let i = 0; i < this.Project.length; i++) {
      if (this.Project[i].status == 1) {
        this.OnGoing.push(this.Project[i])
        console.log(this.Project[i])
      }
      ;
    }
  }
  getArchived() {
    for (let i = 0; i < this.Project.length; i++) {
      if (this.Project[i].status == 0) {
        this.Archived.push(this.Project[i])
      }
      ;
    }
  }
  getProblems() {
    for (let i = 0; i < this.Project.length; i++) {
      if (this.Project[i].status == 2) {
        this.Problems.push(this.Project[i])
      }
      ;
    }
  }
}
