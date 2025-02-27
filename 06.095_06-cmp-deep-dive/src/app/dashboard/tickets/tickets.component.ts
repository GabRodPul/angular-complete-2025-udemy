import { Component } from '@angular/core';
import { NewTicketComponent } from "./new-ticket/new-ticket.component";
import { NewTicket, Ticket } from './ticket.model';
import { TicketComponent } from './ticket/ticket.component';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: Ticket[] = [];

  onAdd(newTicket: NewTicket) {
    const ticket: Ticket = {
      ...newTicket,
      id: Math.random().toString(),
      status: "open",
    }

    this.tickets.push(ticket);
  }

  onClose(id: string) {
    this.tickets = this.tickets.map((t) => ({
      ...t,
      status: t.id === id
            ? "closed"
            : "open"
    }));
  }
}
