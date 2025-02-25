import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NewTask } from '../task/task.model';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css'
})
export class NewTaskComponent {
  cancel  = output<void>();
  add  = output<NewTask>();
  title   = signal("");
  summary = signal("");
  dueDate = signal("");

  onCancel() {
    this.cancel.emit();
  }

  onSubmit() {
    this.add.emit({ 
      title:   this.title(), 
      summary: this.summary(), 
      dueDate: this.dueDate() 
    })
  }
}
