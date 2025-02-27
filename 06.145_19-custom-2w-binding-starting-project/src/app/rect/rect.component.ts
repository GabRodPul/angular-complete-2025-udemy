import { Component, EventEmitter, input, model, Output, output } from '@angular/core';

export const DEFAULT_RECT_SIZE = {
  width: '100',
  height: '100'
};

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding
  // size        = input.required<{ width: string, height: string }>();
  // sizeChange  = output<{ width: string, height: string }>();
  // @Output() sizeChange = new EventEmitter<{ width: string, height: string }>();
  size = model.required<{ width: string, height: string }>();

  onReset() {
    this.size.set({ width: "100", height: "100" }); // DEFAULT_RECT_SIZE not working...
  }
}
