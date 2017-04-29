import { Component, AfterViewInit } from '@angular/core';
import { Title }     from '@angular/platform-browser';

import { TdLoadingService} from '@covalent/core';

import { ProjectsService } from '../../../services';

import { TdDialogService } from '@covalent/core';
import { TdDataTableSortingOrder, TdDataTableService, ITdDataTableSortChangeEvent } from '@covalent/core';
import { IPageChangeEvent } from '@covalent/core';

@Component({
  selector: 'rt-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectComponent implements AfterViewInit {
  columns: any[] = [
    { name: 'icon',  label: '' },
    { name: 'name',  label: 'Project Name', sortable: true },
    { name: 'isActive', label: 'Active Project' },
    { name: 'isPublic', label: 'Public Project' },
    { name: 'description', label: 'Description' },
    { name: 'id', label: 'Action' }
  ];

  data: any[];

  filteredData: any[];
  filteredTotal: number;
  searchTerm: string = '';
  fromRow: number = 1;
  currentPage: number = 1;
  pageSize: number = 5;
  sortBy: string = 'name';
  sortOrder: TdDataTableSortingOrder = TdDataTableSortingOrder.Ascending;

  constructor(private _titleService: Title,
              private _projectsService: ProjectsService,
              private _loadingService: TdLoadingService,
              private _dialogService: TdDialogService,
              private _dataTableService: TdDataTableService) {
  }

  ngAfterViewInit(): void {
    // Page Title
    this._titleService.setTitle( 'Robotest | Project Management | Projects' );
    // Load Project Data
    this._loadingService.register('projects.load');
    this._projectsService.query().subscribe((projects: object[]) => {
      this.data = projects;
      this.filteredData = this.data;
      this.filteredTotal = this.data.length;
      this.filter();
      setTimeout(() => {
        this._loadingService.resolve('projects.load');
      }, 750);
    });
  }

  sort(sortEvent: ITdDataTableSortChangeEvent): void {
    this.sortBy = sortEvent.name;
    this.sortOrder = sortEvent.order;
    this.filter();
  }

  search(searchTerm: string): void {
    this.searchTerm = searchTerm;
    this.filter();
  }

  page(pagingEvent: IPageChangeEvent): void {
    this.fromRow = pagingEvent.fromRow;
    this.currentPage = pagingEvent.page;
    this.pageSize = pagingEvent.pageSize;
    this.filter();
  }

  filter(): void {
    let newData: any[] = this.data;
    newData = this._dataTableService.filterData(newData, this.searchTerm, true);
    this.filteredTotal = newData.length;
    newData = this._dataTableService.sortData(newData, this.sortBy, this.sortOrder);
    newData = this._dataTableService.pageData(newData, this.fromRow, this.currentPage * this.pageSize);
    this.filteredData = newData;
  }

  openConfirm(id: string): void {
    this._dialogService.openConfirm({
      message: 'Are you sure you want to delete this project? It\'s being used!',
      title: 'Confirm',
      cancelButton: 'No, Cancel',
      acceptButton: 'Yes, Delete',
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        this.deleteProject(id);
      } else {
        // DO SOMETHING ELSE
      }
    });
  }

  deleteProject(id: any): void {

  }
}
