import { CashPostModalComponent } from '../cash-post-modal/cash-post-modal.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { CashRegister } from '../../models/CashRegister';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {
  private url = "http://localhost:5103/api/cashregisters";

  //cash modal variables
  private cashPostModalState = new BehaviorSubject<boolean>(false);
  cashPostModalState$ = this.cashPostModalState.asObservable();

  private cashUpdateModalState = new BehaviorSubject<boolean>(false);
  cashUpdateModalState$ = this.cashUpdateModalState.asObservable();

  private cashRegisterId = new BehaviorSubject<number | null>(null)
  cashRegisterId$ = this.cashRegisterId.asObservable();

  //handle update on registers list
  updateList$ = new ReplaySubject<void>(1);

  constructor(private http: HttpClient) { }

  notifyListUpdate() {
    setTimeout(() => {
      this.updateList$.next();
    }, 0)
  }

  getCashRegisters(): Observable<CashRegister[]> {
    return this.http.get<CashRegister[]>(`${this.url}`);
  }

  createCashRegister(payload: CashRegister): Observable<any> {
    // this.getCashRegisters();
    return this.http.post(`${this.url}`, payload)
  }

  removeCashRegister(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`);
  }

  openCashPostModal() { this.cashPostModalState.next(true) }
  closeCashPostModal() { this.cashPostModalState.next(false) }

  openCashUpdateModal(id: number) {
    this.cashUpdateModalState.next(true)
    this.cashRegisterId.next(id);
  }
  closeUpdatePostModal() { this.cashUpdateModalState.next(false) }
}
