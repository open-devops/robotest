import { Component, AfterViewInit } from '@angular/core';

import { Title }     from '@angular/platform-browser';

import { TdLoadingService, TdDigitsPipe } from '@covalent/core';

import { RunReportsService, RunSetsService, RequirementsService } from '../../services';

import { multi } from './data';

@Component({
  selector: 'rt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  viewProviders: [ RunReportsService, RunSetsService, RequirementsService ],
})
export class DashboardComponent implements AfterViewInit {

  users: Object[];
  runReports: Object[];
  runSets: Object[];
  requirements: Object[];

  // Chart
  multi: any[];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = '';
  showYAxisLabel: boolean = true;
  legendTitle: string = 'Status';
  yAxisLabel: string = 'Test Case';

  colorScheme: any = {
    domain: ['#1565C0', '#2196F3', '#81D4FA', '#FF9800', '#EF6C00'],
  };

  constructor(private _titleService: Title,
              private _runReportsService: RunReportsService,
              private _requirementsService: RequirementsService,
              private _runSetsService: RunSetsService,
              private _loadingService: TdLoadingService) {
                // Chart
                this.multi = multi.map((group: any) => {
                  group.series = group.series.map((dataItem: any) => {
                    dataItem.name = new Date(dataItem.name);
                    return dataItem;
                  });
                  return group;
                });
  }

  ngAfterViewInit(): void {
    // New Test Run Reports
    this._titleService.setTitle( 'Robotest Portal Dashboard' );
    this._loadingService.register('reports.load');
    this._runReportsService.query().subscribe((runReports: Object[]) => {
      this.runReports = runReports;
      setTimeout(() => {
        this._loadingService.resolve('reports.load');
      }, 750);
    });
    // New Requirements
    this._loadingService.register('requirements.load');
    this._requirementsService.query().subscribe((requirements: Object[]) => {
      this.requirements = requirements;
      setTimeout(() => {
        this._loadingService.resolve('requirements.load');
      }, 750);
    });
    // New Test Run Set
    this._loadingService.register('runsets.load');
    this._runSetsService.query().subscribe((runSets: Object[]) => {
      this.runSets = runSets;
      setTimeout(() => {
        this._loadingService.resolve('runsets.load');
      }, 750);
    });
  }

  // ngx transform using covalent digits pipe
  axisDigits(val: any): any {
    return new TdDigitsPipe().transform(val);
  }
}
