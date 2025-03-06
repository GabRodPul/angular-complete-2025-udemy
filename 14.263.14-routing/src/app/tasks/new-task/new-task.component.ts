import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;
  private tasks  = inject(TasksService);
  private router = inject(Router);

  onSubmit() {
    this.tasks.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true;

    this.router.navigate(["/users", this.userId(), "tasks"], {
      replaceUrl: true
    });
  }
}

export const canLeave: CanDeactivateFn<NewTaskComponent> = (component) => {
  return !component.submitted
      || component.enteredTitle()
      || component.enteredDate() 
      || component.enteredSummary()
       ? window.confirm("Do you really want to leave?")
       : true;
}