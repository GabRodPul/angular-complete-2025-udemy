import { Component, ElementRef, viewChild, viewChildren } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ButtonComponent, ControlComponent, FormsModule],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css'
})
export class NewTicketComponent {
  private form    = viewChild.required<ElementRef<HTMLFormElement>>("form");
  // private buttons = viewChildren<ButtonComponent>(ButtonComponent);

  onSubmit(title: string, ticketText: string) {
    console.dir(title);
    console.dir(ticketText);
    this.form().nativeElement.reset();
  }
}
