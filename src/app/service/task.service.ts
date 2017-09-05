import { Injectable } from '@angular/core';
import { Task } from '../data/Task';
import { TASKS } from './mock-tasks';

let tasks = TASKS;
let lastTaskId = 100;

@Injectable()
export class TaskService {
  constructor() { }
  saveTask(taskToSave: Task): Promise<Task> {
    console.log('save task');
    const existingTaskIndex = tasks.findIndex(task => task.id === taskToSave.id);
    if (existingTaskIndex !== -1) {
      tasks[existingTaskIndex] = taskToSave;
      return Promise.resolve({...taskToSave});
    } else {
      const savedTask = { ...taskToSave, id: '' + lastTaskId++ };
      tasks.push(savedTask);
      return Promise.resolve(savedTask);
    }
  }
  getTasks(page: number = 0, size: number = 20): Promise<Task[]> {
    let tasksToReturn: Task[];
    const startIndexInclusive = page * size;
    const endIndexExclusive = (page + 1) * size;
    if (startIndexInclusive >= tasks.length) {
      tasksToReturn = [];
    } else {
      tasksToReturn = tasks.slice(startIndexInclusive, endIndexExclusive);
    }
    return Promise.resolve(tasksToReturn);
  }
  getTask(id: string): Promise<Task> {
    const foundTask = tasks.find((task) => task.id === id);
    if (foundTask) {
      return Promise.resolve(foundTask);
    } else {
      return Promise.reject(`task with id ${id} not found`);
    }
  }
  removeTask(id: string): Promise<any> {
    const oldLength = tasks.length;
    tasks = tasks.filter(task => task.id !== id);
    if (tasks.length === oldLength) {
      return Promise.reject('no task found to delete');
    }
    return Promise.resolve('success');
  }
}
