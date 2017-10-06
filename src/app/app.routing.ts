import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { GuardService } from './shared';

const Approutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadChildren: './authentication/login/login.module#LoginModule' },
  { path: 'register', loadChildren: './authentication/register/register.module#RegisterModule' },
  { path: 'reminder', loadChildren: './authentication/reminder/reminder.module#ReminderModule' },
  { path: '404', loadChildren: './authentication/error404/error404.module#Error404Module' },
  { path: 'pages', loadChildren: './pages/pages.module#PagesModule', canActivate: [GuardService] },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(Approutes, {enableTracing: true} )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    GuardService
  ]
})


export class AppRoutingModule {

}
