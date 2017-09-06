import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Task } from '../data/task';
import { TaskService } from '../service/task.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  closeResult: string;
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
              private router: Router,
              private modalService: NgbModal) {
  }

  ngOnInit() {
    this.taskService.getTasks(0).then((tasks) => this.tasks = tasks);
  }

  editTask(id: string) {
    this.router.navigate(['/tasks', id]);
    return false;
  }

  createTask() {
    this.router.navigate(['/tasks', 'create']);
  }

  removeTask(id: string) {
    this.taskService.removeTask(id);
    this.tasks = this.tasks.filter(task => task.id !== id);
    return false;
  }


  open(content) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
