import { Component, computed, DestroyRef, inject, input, signal, Signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent {
  userId = input.required<string>();
  // order  = input<"asc" | "desc">();
  // order?: "asc" | "desc";
  order = signal<"asc" | "desc">("desc");
  userTasks = computed(
    () => {
      const t = this.tasksService.allTasks().filter(t => t.userId === this.userId());
      switch (this.order()) {
        case "asc":
          return t.sort();

        case "desc":
          return t.sort().reverse();

        default:
          return t;
      }
    }
  );
  private tasksService = inject(TasksService);
  private activeRoute = inject(ActivatedRoute);
  private destroy = inject(DestroyRef);

  ngOnInit(): void {
    const sub = this.activeRoute.queryParams.subscribe({
      next: params => this.order.set(params["order"])
    });

    this.destroy.onDestroy(() => { sub.unsubscribe() })
  }
}
