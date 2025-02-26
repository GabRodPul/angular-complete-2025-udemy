import { Component, computed, input, signal } from '@angular/core';
import { TaskComponent } from "./task/task.component";
import { NewTaskComponent } from "./new-task/new-task.component";
import { NewTask } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [TaskComponent, NewTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  userId    = input<string>();
  name      = input<string>();
  isAdding  = false;

  constructor(private tasks: TasksService) {}
  
  selectedUserTasks = computed(() => this.tasks.getUserTasks(this.userId()!));
  onCompleteTask(id: string) {
    this.isAdding = false;
  }

  newTaskDialogue(b: boolean) {
    this.isAdding = b;
  }
}
