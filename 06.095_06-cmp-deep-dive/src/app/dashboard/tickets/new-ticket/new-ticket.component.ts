import { AfterViewInit, Component, ElementRef, OnInit, output, ViewChild, viewChild, viewChildren } from '@angular/core';
import { ControlComponent } from "../../../shared/control/control.component";
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';
import { NewTicket } from '../ticket.model';

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
  fTitle  = "";
  fText   = "";
  add = output<NewTicket>();

  ngOnInit(): void {
    console.log("ONINIT");
    console.log(this.form().nativeElement);
  }

  ngAfterViewInit(): void {
    console.log("AFTER VUEW INIT");
    console.log(this.form().nativeElement);
  }

  onSubmit() {
    this.add.emit({ 
      title  : this.fTitle, 
      request: this.fText,
    });
    // this.form().nativeElement.reset();
    this.fTitle = "";
    this.fText  = "";
  }
}
