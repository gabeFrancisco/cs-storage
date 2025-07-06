import { CashPostModalComponent } from './cash-post-modal/cash-post-modal.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CashRegister } from '../models/CashRegister';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {
  private url = "http://localhost:5103/api/cashregisters";
  private cashPostModalState = new BehaviorSubject<boolean>(false);
  cashPostModalState$ = this.cashPostModalState.asObservable();

  constructor(private http: HttpClient) { }

  getCashRegisters(): Observable<CashRegister[]> {
    return this.http.get<CashRegister[]>(`${this.url}`);
  }

  createCashRegister(payload: CashRegister): Observable<any> {
    // this.getCashRegisters();
    return this.http.post(`${this.url}`, payload)
  }

  openCashPostModal() { this.cashPostModalState.next(true) }
  closeCashPostModal() { this.cashPostModalState.next(false) }
}
