import { Component, inject, input } from '@angular/core';
import { Task } from "./task.model"
import { CardComponent } from "../../shared/card/card.component";
import { DatePipe } from '@angular/common';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CardComponent, DatePipe],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  task      = input.required<Task>()
  tasks     = inject(TasksService);

  onCompleteTask() {
    this.tasks.removeTask(this.task().id)
  }
}
