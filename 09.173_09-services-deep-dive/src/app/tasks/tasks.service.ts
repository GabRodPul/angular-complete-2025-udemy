import { inject, Injectable, signal } from '@angular/core';
import { Task, TaskStatus } from './task.model';
import { LoggingService } from '../logging.service';

// @Injectable({
  // providedIn: 'root'
// })
export class TasksService {
  private tasks = signal<Task[]>([]);
  all = this.tasks.asReadonly();
  private logging = inject(LoggingService);

  add(task: Omit<Task, "id" | "status">) {
    this.tasks.update((old) => [ ...old, {
      ...task,
      id: Math.random().toString(),
      status: "OPEN"
    }])

    this.logging.log("ADDED TASK WITH TITLE " + task.title);
  }

  updateStatus(taskId: string, status: TaskStatus) {
    this.tasks.update((old) => old.map(t => 
      t.id == taskId 
      ? { ...t, status }
      : t
    ));

    this.logging.log("CHANGE TASK STATUS TO " + taskId);
  }
}
