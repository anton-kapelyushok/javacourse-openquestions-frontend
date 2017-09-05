import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ExamsComponent} from './exams/exams.component';
import { TasksComponent } from './tasks/tasks.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';


const routes: Routes = [
  { path: 'exams',  component: ExamsComponent },
  { path: 'tasks',  component: TasksComponent },
  { path: 'tasks/create', component: EditTaskComponent },
  { path: 'tasks/:id', component: EditTaskComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
