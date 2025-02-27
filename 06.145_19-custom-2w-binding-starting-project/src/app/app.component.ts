import { Component } from '@angular/core';
import { DEFAULT_RECT_SIZE, RectComponent } from './rect/rect.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  imports: [RectComponent, FormsModule],
})
export class AppComponent {
  rectSize = DEFAULT_RECT_SIZE;
}
