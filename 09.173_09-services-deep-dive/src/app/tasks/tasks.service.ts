import { Injectable, signal } from '@angular/core';
import { Task } from './task.model';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  tasks = signal<Task[]>([]);

  addTask(task: Omit<Task, "id" | "status">) {
    this.tasks.update((old) => [ ...old, {
      ...task,
      id: Math.random().toString(),
      status: "OPEN"
    }])
  }
}
