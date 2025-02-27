import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, viewChild, viewChildren } from '@angular/core';
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
export class NewTicketComponent implements
  OnInit,
  AfterViewInit {
  // @ViewChild("form") private form: ElementRef<HTMLFormElement>;
  private form    = viewChild.required<ElementRef<HTMLFormElement>>("form");
  // private buttons = viewChildren<ButtonComponent>(ButtonComponent);

  ngOnInit(): void {
    console.log("ONINIT");
    console.log(this.form().nativeElement);
  }

  ngAfterViewInit(): void {
    console.log("AFTER VUEW INIT");
    console.log(this.form().nativeElement);
  }

  onSubmit(title: string, ticketText: string) {
    console.dir(title);
    console.dir(ticketText);
    this.form().nativeElement.reset();
  }
}
