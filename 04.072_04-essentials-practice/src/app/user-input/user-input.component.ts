import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from "../investment.model";

@Component({
  selector: 'app-user-input',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  calculate          = output<InvestmentInput>();
  fInitialInvestment = signal("0");
  fAnnualInvestment  = signal("0");
  fExpectedReturn    = signal("5");
  fDuration          = signal("10");

  onSubmit() {
    this.calculate.emit({
      initialInvestment:  +this.fInitialInvestment(),
      annualInvestment:   +this.fAnnualInvestment(),
      expectedReturn:     +this.fExpectedReturn(),
      duration:           +this.fDuration(),
    })

    this.fInitialInvestment.set("0");
    this.fAnnualInvestment .set("0");
    this.fExpectedReturn   .set("5");
    this.fDuration         .set("10");
  }
}
