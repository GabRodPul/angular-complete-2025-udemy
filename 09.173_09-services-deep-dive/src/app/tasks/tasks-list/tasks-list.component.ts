import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { Task, TaskStatus } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  selectedFilter = signal<string>('all');
  private _tasks   = inject(TasksService);
  tasks = computed(() => {
    const status = (status: TaskStatus) => (t: Task) => t.status === status;
    switch (this.selectedFilter()) {
      case "open": 
        return this._tasks.all().filter(status("OPEN"));
      case "in-progress": 
        return this._tasks.all().filter(status("IN_PROGRESS"));
      case "done": 
        return this._tasks.all().filter(status("DONE"));
      default:
        return this._tasks.all();
    }
  });

  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
