import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../data/task';
import { TaskService } from '../service/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  public tasks: Task[] = [];

  public rows: Array<any> = [];
  public columns: Array<any> = [
    { title: 'Id', name: 'id' },
    { title: 'Question', name: 'question' },
    { title: '', name: '' },
  ];
  public config: any = {
    paging: true,
    sorting: {columns: this.columns},
    filtering: {filterString: ''},
    className: ['table-striped', 'table-bordered']
  };

  constructor(private taskService: TaskService,
              private router: Router) {
  }

  ngOnInit() {
    this.taskService.getTasks(0).then((tasks) => this.tasks = tasks);
  }

  editTask(id: string) {
    this.router.navigate(['/tasks', id]);
  }

  createTask() {
    this.router.navigate(['/tasks', 'create']);
  }

  removeTask(id: string) {
    this.taskService.removeTask(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
  }
}
