import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './main/main.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectManagementComponent } from './project-mgr/project-mgr.component';
import { ProjectComponent } from './project-mgr/projects/projects.component';
import { ProjectFormComponent } from './project-mgr/projects/form/form.component';
import { LoginComponent } from './login/login.component';
import { LandingComponent } from './landing/landing.component';

const routes: Routes = [
  {path: '', component: LandingComponent},
  {path: 'login', component: LoginComponent},
  {path: 'portal', component: MainComponent, children: [{
      component: DashboardComponent,
      path: '',
    },
    {path: 'project-mgr', component: ProjectManagementComponent, children: [
        {path: 'projects', children: [
          {path: '', component: ProjectComponent},
          {path: 'add', component: ProjectFormComponent},
          {path: ':id/delete', component: ProjectFormComponent},
          {path: ':id/edit', component: ProjectFormComponent},
          {path: ':id/view', component: ProjectFormComponent},
        ]},
    ]},
  ]},
];

export const appRoutingProviders: any[] = [

];

export const appRoutes: any = RouterModule.forRoot(routes, { useHash: true });
