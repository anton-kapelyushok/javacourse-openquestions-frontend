import { Injectable } from '@angular/core';
import { Exam, UnnormalizedExam } from '../data/exam';
import { EXAMS } from './mock-exams';
import { TASKS } from './mock-tasks';
import { TaskService } from './task.service';


@Injectable()
export class ExamService {
  exams = EXAMS;
  constructor(private taskService: TaskService) { }
  createConfiguration() {}
  getExam(id): Promise<UnnormalizedExam> {
    const exam = this.exams.find(e => e.globalExamId === id);
    console.log('here');
    const unnormalizedExam: UnnormalizedExam = {
      globalExamId: exam.globalExamId,
      configuration: {
        name: exam.configuration.name,
        examContainer: exam.configuration.examContainer,
        tasks: exam.configuration.ids && exam.configuration.ids.map(taskId => this.taskService.tasks.find(task => task.id === taskId ))
      }
    };
    return Promise.resolve(unnormalizedExam);
  }
  getExams(): Promise<Exam[]> {
    return Promise.resolve(this.exams);
  }

}
