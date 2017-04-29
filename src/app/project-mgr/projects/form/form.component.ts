import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProjectsService, IProject } from '../../../../services';

@Component({
  selector: 'rt-project-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  viewProviders: [ ProjectsService ],
})
export class ProjectFormComponent implements OnInit  {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean = true;
  isPublic: boolean = false;
  project: IProject;

  action: string;

  constructor(private _projectsService: ProjectsService, private _route: ActivatedRoute) {}

  goBack(): void {
    window.history.back();
  }

  ngOnInit(): void {
    this._route.url.subscribe((url: any) => {
      this.action = (url.length > 1 ? url[1].path : 'add');
    });
    this._route.params.subscribe((params: {id: string}) => {
      let projectId: string = params.id;
      this._projectsService.get(projectId).subscribe((project: any) => {
        this.name = project.name;
        this.description = project.description;
        this.isActive = project.isActive;
        this.isPublic = project.isPublic;
        this.icon = project.icon;
        this.id = project.id;
      });
    });
  }

  save(): void {
    this.project = {
      id: this.id,
      name: this.name,
      description: this.description,
      icon: this.icon,
      isActive: this.isActive,
      isPublic: this.isPublic,
    };
    this.goBack();
  }
}
