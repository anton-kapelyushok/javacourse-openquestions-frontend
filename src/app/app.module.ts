import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TaskService } from './service/task.service';

import { AppComponent } from './app.component';
import { ExamsComponent } from './exams/exams.component';
import { AppRoutingModule } from './app-routing.module';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './tasks/task/task.component';
import { TaskFormComponent } from './tasks/task-form/task-form.component';
import { EditTaskComponent } from './tasks/edit-task/edit-task.component';

@NgModule({
  declarations: [
    AppComponent,
    ExamsComponent,
    TasksComponent,
    TaskComponent,
    TaskFormComponent,
    EditTaskComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
  ],
  providers: [ TaskService ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
