import { Component, computed, inject, input } from '@angular/core';
import { InvestmentResult } from '../investment.model';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  private investmentServ = inject(InvestmentService);
  results = this.investmentServ.results.asReadonly();
}
