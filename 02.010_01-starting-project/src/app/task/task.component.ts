import { Component, input } from '@angular/core';

type Task = {
  id:       string
  userId:   string
  title:    string
  summary:  string  
  dueDate:  string
}

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css'
})
export class TaskComponent {
  task = input.required<Task>()
}
