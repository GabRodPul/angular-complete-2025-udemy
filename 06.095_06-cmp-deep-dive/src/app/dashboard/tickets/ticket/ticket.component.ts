import { Component, input, output, signal } from '@angular/core';
import { Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {
  data        = input.required<Ticket>();
  close       = output();
  showDetails = signal(false);

  onToggleDetails() {
    // this.showDetails.set(!this.showDetails());
    this.showDetails.update(v => !v);
  }

  onClose() {
    this.close.emit();
  }
}
