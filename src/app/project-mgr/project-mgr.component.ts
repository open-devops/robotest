import { Component, AfterViewInit } from '@angular/core';

import { Title } from '@angular/platform-browser';

import { TdMediaService } from '@covalent/core';

@Component({
  selector: 'rt-project-mgr',
  templateUrl: 'project-mgr.component.html',
  styleUrls: ['project-mgr.component.scss'],
})
export class ProjectManagementComponent implements AfterViewInit {

  title: string;
  constructor(private _titleService: Title,
              public media: TdMediaService) { }

  ngAfterViewInit(): void {
    // broadcast to all listener observables when loading the page
    this.media.broadcast();

    this._titleService.setTitle( 'Manage Project' );
    this.title = this._titleService.getTitle();
  }
}
