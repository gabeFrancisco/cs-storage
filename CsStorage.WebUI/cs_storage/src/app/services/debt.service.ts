import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
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

  openDebtPostModal() { this.debtPostModalState.next(true) }
  closeDebtPostModal() { this.debtPostModalState.next(false) }

  //handle update on registers list
  updateList$ = new ReplaySubject<void>(1);

  notifyListUpdate() {
    setTimeout(() => {
      this.updateList$.next();
    }, 0)
  }

  getDebts(): Observable<Debt[]> {
    return this.http.get<Debt[]>(this.url);
  }

  createDebt(payload: Debt): Observable<any> {
    return this.http.post(this.url, payload);
  }
}
