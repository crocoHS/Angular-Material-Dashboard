import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboards.component';
import { HomeDashboardComponent } from './pages/home-dashboard/home-dashboard.component';
import { SalesTeamDashboardComponent } from './pages/sales-team-dashboard/sales-team-dashboard.component';
import { AuthGuardService } from '../../core/guards/auth-guard.service';
import { ProjectDashboardComponent } from './pages/project-dashboard/project-dashboard.component';
import { ProjectListComponent } from './pages/project-dashboard/pages/project-list/project-list.component';
import { ProjectDetailComponent } from './pages/project-dashboard/pages/project-detail/project-detail.component';
import { ProjectNewComponent } from './pages/project-dashboard/pages/project-new/project-new.component';
import { ProjectSettingComponent } from './pages/project-dashboard/pages/project-setting/project-setting.component';
import {SalesOfficerDashboardComponent} from './pages/sales-officer-dashboard/sales-officer-dashboard.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
        data: {
            breadcrumb: 'jancok'
        },
        children: [
            {
                path: '',
                redirectTo: 'overview'
            },
            {
                path: 'overview',
                component: HomeDashboardComponent,
                data: {
                    breadcrumb: 'overview'
                }
            },
            {
                path: 'sales-team',
                component: SalesTeamDashboardComponent,
                data: {
                    breadcrumb: 'sales-team'
                }
            },
            {
                path: 'sales-officer',
                component: SalesOfficerDashboardComponent,
                data: {
                    breadcrumb: 'sales-officer'
                }
            },
            {
                path: 'project',
                children: [
                    {
                        path: '',
                        redirectTo: 'list'
                    },
                    {
                        path: 'list',
                        component: ProjectListComponent
                    },
                    {
                        path: 'detail/:id',
                        component: ProjectDetailComponent
                    },
                    {
                        path: 'new-project',
                        component: ProjectNewComponent
                    },
                    {
                        path: 'setting/:id',
                        component: ProjectSettingComponent
                    },
                ]
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardsRoutingModule { }
