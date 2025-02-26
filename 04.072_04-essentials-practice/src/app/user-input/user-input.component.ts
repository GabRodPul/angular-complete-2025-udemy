import { Component, output } from '@angular/core';
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
  calculate = output<InvestmentInput>();
  fInitialInvestment = "0";
  fAnnualInvestment  = "0";
  fExpectedReturn    = "5";
  fDuration          = "10";

  onSubmit() {
    this.calculate.emit({
      initialInvestment:  +this.fInitialInvestment,
      annualInvestment:   +this.fAnnualInvestment,
      expectedReturn:     +this.fExpectedReturn,
      duration:           +this.fDuration,
    })
  }
}
