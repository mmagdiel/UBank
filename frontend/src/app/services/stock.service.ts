import { Injectable } from '@angular/core';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class StockService {
  private stock: number = 0;

  constructor() {
    this.stock = environment.stock;
  }

  canLoan(amount: number): boolean {
    if (amount > this.stock) {
      return false;
    }
    const flat = Math.random();
    if (flat > 0.75) {
      return false;
    }
    this.changeStock(amount);
    return true;
  }

  changeStock(amount: number) {
    this.stock -= amount;
  }
}
