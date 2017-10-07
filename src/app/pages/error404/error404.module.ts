import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Error404RoutingModule } from './error404.routing';

import { Error404Component } from './error404.component';

@NgModule({
  declarations: [
    Error404Component
  ],
  imports: [
    CommonModule,
    Error404RoutingModule
  ],
  exports: [],
  providers: [],
})
export class Error404Module {}
