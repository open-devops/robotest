import { Component, AfterViewInit } from '@angular/core';

import { TdLoadingService} from '@covalent/core';

import { ProjectsService } from '../../services';

@Component({
  selector: 'rt-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  viewProviders: [ ProjectsService ],
})
export class MainComponent implements AfterViewInit {

  routes: Object[] = [{
      title: 'Portal Dashboard',
      route: '/portal/',
      icon: 'dashboard',
    },{
      title: 'Test Project Management',
      route: '/portal/project-mgr/projects',
      icon: 'library_add',
    }, {
      title: 'Test Library Management',
      route: '/portal/library',
      icon: 'photo_library',
    }, {
      title: 'Test Design Management',
      route: '/portal/design',
      icon: 'library_books',
    }, {
      title: 'Test Run Management',
      route: '/portal/run',
      icon: 'video_library',
    }
  ];

  projects: Object[];
  currentProjectName: string = 'Default Test Project';

  constructor(private _projectsService: ProjectsService,
              private _loadingService: TdLoadingService) { }


  ngAfterViewInit(): void {
    this._loadingService.register('projects.load');
    this._projectsService.query().subscribe((projects: Object[]) => {
      this.projects = projects;
      setTimeout(() => {
        this._loadingService.resolve('projects.load');
      }, 750);
    });
  }

  setCurrentProject(currentProjectName: string) {
    this.currentProjectName = currentProjectName;
  }
}
