import { Injectable } from '@angular/core';
import { Task } from '../data/Task';
import { TASKS } from './mock-tasks';

let lastTaskId = 100;

@Injectable()
export class TaskService {
  tasks = TASKS;
  constructor() { }
  saveTask(taskToSave: Task): Promise<Task> {
    console.log('save task');
    const existingTaskIndex = this.tasks.findIndex(task => task.id === taskToSave.id);
    if (existingTaskIndex !== -1) {
      this.tasks[existingTaskIndex] = taskToSave;
      return Promise.resolve({...taskToSave});
    } else {
      const savedTask = { ...taskToSave, id: '' + lastTaskId++ };
      this.tasks.push(savedTask);
      return Promise.resolve(savedTask);
    }
  }
  getTasks(page: number = 0, size: number = 20): Promise<Task[]> {
    let tasksToReturn: Task[];
    const startIndexInclusive = page * size;
    const endIndexExclusive = (page + 1) * size;
    if (startIndexInclusive >= this.tasks.length) {
      tasksToReturn = [];
    } else {
      tasksToReturn = this.tasks.slice(startIndexInclusive, endIndexExclusive);
    }
    return Promise.resolve(tasksToReturn);
  }
  getTask(id: string): Promise<Task> {
    const foundTask = this.tasks.find((task) => task.id === id);
    if (foundTask) {
      return Promise.resolve(foundTask);
    } else {
      return Promise.reject(`task with id ${id} not found`);
    }
  }
  removeTask(id: string): Promise<any> {
    const oldLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    if (this.tasks.length === oldLength) {
      return Promise.reject('no task found to delete');
    }
    return Promise.resolve('success');
  }
}
