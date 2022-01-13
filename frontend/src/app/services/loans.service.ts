import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILoans } from '../models/loans';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LoansService {
  private root: string = '';

  constructor(private http: HttpClient) {
    this.root = environment.root;
  }

  addLoan(body: ILoans) {
    return this.http.post<ILoans>(`${this.root}/loans`, body, {});
  }
}
