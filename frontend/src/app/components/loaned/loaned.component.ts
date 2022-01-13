import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoansService } from '../../services/loans.service';
import { StockService } from '../../services/stock.service';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-loaned',
  templateUrl: './loaned.component.html',
  styleUrls: ['./loaned.component.scss'],
})
export class LoanedComponent implements OnInit {
  isLinear = true;
  loanedForm!: FormGroup;
  personalForm!: FormGroup;
  minDate: Date;

  constructor(
    private _formBuilder: FormBuilder,
    private _stockService: StockService,
    private _loansService: LoansService,
    private _usersService: UsersService,
    private _snackBar: MatSnackBar
  ) {
    this.minDate = new Date();
  }

  ngOnInit() {
    this.loanedForm = this._formBuilder.group({
      value: [
        '',
        [Validators.required, Validators.min(10000), Validators.max(100000)],
      ],
      date: [''],
    });
    this.personalForm = this._formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      documentation: [
        0,
        [
          Validators.required,
          Validators.min(999999),
          Validators.max(9999999999),
        ],
      ],
    });
  }

  isLowerValue() {
    return this.loanedForm.get('value')?.getError('min');
  }

  isGreaterValue() {
    return this.loanedForm.get('value')?.getError('max');
  }

  isValidValue() {
    return this.loanedForm.get('value')?.getError('required');
  }

  isValidName() {
    return this.personalForm.get('name')?.getError('required');
  }

  isValidEmail() {
    return this.personalForm.get('email')?.getError('required');
  }

  isLowerDocumentation() {
    return this.personalForm.get('documentation')?.getError('min');
  }

  isGreaterDocumentation() {
    return this.personalForm.get('documentation')?.getError('max');
  }

  isValidDocumentation() {
    return this.personalForm.get('documentation')?.getError('required');
  }

  canLoaned(amount: number) {
    const isLoaned = this._stockService.canLoan(amount);
    if (isLoaned) {
      const newLoad = this.loanedForm.value;
      const newUser = this.personalForm.value;
      this._stockService.changeStock(amount);
      this._loansService.addLoan({ ...newLoad, id: 0 });
      this._usersService.addUser({ ...newUser, id: 0 });
    }
    const message = isLoaned
      ? 'Greater, your credit was approved!'
      : 'Sorry, your credit was rejected ';
    this._snackBar.open(message, 'OK');
  }
}
