import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages.component';

import { GuardService } from './../shared';

const pagesRoutes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      { path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [GuardService] },
      { path: 'courses', loadChildren: './courses/courses.module#CoursesModule', canActivate: [GuardService] },
      { path: '**', redirectTo: 'dashboard' }
    ]
  }
];

@NgModule ({
  imports: [
    RouterModule.forChild(pagesRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
    GuardService
  ]
})

export class PagesRoutingModule {

}
