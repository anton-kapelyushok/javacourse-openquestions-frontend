import { Injectable } from '@angular/core';
import { Configuration, Exam, UnnormalizedExam } from '../data/exam';
import { EXAMS } from './mock-exams';
import { TaskService } from './task.service';


@Injectable()
export class ExamService {
  lastId = 100;
  exams = EXAMS;
  constructor(private taskService: TaskService) { }
  createConfiguration(configuration: Configuration): Promise<Exam> {
    const exam: Exam = {
      globalExamId: ++this.lastId + '',
      configuration,
    };
    this.exams = [ ...this.exams, exam ];
    return Promise.resolve(exam);
  }
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
