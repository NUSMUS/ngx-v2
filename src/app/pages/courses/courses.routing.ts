import { Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { LessonsComponent } from './lessons/lessons.component';

export const CoursesComponent: Routes = [
  {
    path: '',
    children: [{
      path: 'list',
      component: ListComponent,
      data: {
        heading: 'List'
      }
    }, {
      path: 'lessons',
      component: LessonsComponent,
      data: {
        heading: 'Lessons'
      }
    }]
  }
];
