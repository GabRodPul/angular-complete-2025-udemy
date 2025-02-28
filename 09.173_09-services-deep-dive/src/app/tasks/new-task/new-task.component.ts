import { Component, ElementRef, Inject, inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TaskToken } from '../../../main';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl  = viewChild<ElementRef<HTMLFormElement>>('form');
  // private tasks   = inject(TasksService);
  constructor(@Inject(TaskToken) private tasks: TasksService) { }

  onAddTask(title: string, description: string) {
    this.tasks.add({ title, description });
    this.formEl()?.nativeElement.reset();
  }
}
