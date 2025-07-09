import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Debt } from '../../models/Debt';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  constructor(private http: HttpClient) { }

  private url = "http://localhost:5103/api/debts";

  //debt modal variables
  private debtPostModalState = new BehaviorSubject<boolean>(false);
  debtPostModalState$ = this.debtPostModalState.asObservable();

  openDebtPostModal() { this.debtPostModalState.next(true)}
  closeDebtPostModal() { this.debtPostModalState.next(false)}


  getDebts(): Observable<Debt[]>{
    return this.http.get<Debt[]>(this.url);
  }
}
