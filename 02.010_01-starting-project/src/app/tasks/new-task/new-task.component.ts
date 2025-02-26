import { Component, inject, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../task/task.model';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  userId  = input.required<string>();
  close   = output<void>();
  add     = output<NewTask>();
  title   = signal("");
  summary = signal("");
  dueDate = signal("");
  private tasks = inject(TasksService);

  onClose() {
    this.close.emit();
  }

  onSubmit() {
    this.tasks.addTask({ 
      title:   this.title(), 
      summary: this.summary(), 
      dueDate: this.dueDate() 
    }, this.userId());

    this.close.emit();
  }
}
