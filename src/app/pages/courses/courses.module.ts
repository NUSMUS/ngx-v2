import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoursesComponent } from './courses.routing';

import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(CoursesComponent),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [

  ],
  providers: [

  ],
})
export class CoursesModule {

}
