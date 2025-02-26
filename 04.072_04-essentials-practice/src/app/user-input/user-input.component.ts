import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvestmentInput } from "../investment.model";
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-user-input',
  templateUrl: './user-input.component.html',
  styleUrl: './user-input.component.css'
})
export class UserInputComponent {
  fInitialInvestment = signal("0");
  fAnnualInvestment  = signal("0");
  fExpectedReturn    = signal("5");
  fDuration          = signal("10");

  constructor(private investmentServ: InvestmentService) {}

  onSubmit() {
    this.investmentServ.calculate({
      initialInvestment:  +this.fInitialInvestment(),
      annualInvestment:   +this.fAnnualInvestment(),
      expectedReturn:     +this.fExpectedReturn(),
      duration:           +this.fDuration(),
    });

    this.fInitialInvestment.set("0");
    this.fAnnualInvestment .set("0");
    this.fExpectedReturn   .set("5");
    this.fDuration         .set("10");
  }
}
