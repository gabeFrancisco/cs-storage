import { CashRegister } from './../../models/CashRegister';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, ReplaySubject, shareReplay, Subject, tap } from 'rxjs';
import { handleNetworkError } from '../../utils/errorHandler';
import { DayAndMonthData } from '../../models/ValueObjects/DayAndMonthData';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {
  private list$?: Observable<CashRegister[]>;

  constructor(private http: HttpClient) { }
  private url = "http://127.0.0.1:8000/api/cashregisters";

  //cash modal variables
  private cashPostModalState = new BehaviorSubject<boolean>(false);
  cashPostModalState$ = this.cashPostModalState.asObservable();

  private cashUpdateModalState = new BehaviorSubject<boolean>(false);
  cashUpdateModalState$ = this.cashUpdateModalState.asObservable();

  private cashRegisterId = new BehaviorSubject<number | null>(null)
  cashRegisterId$ = this.cashRegisterId.asObservable();

  openCashPostModal() { this.cashPostModalState.next(true) }
  closeCashPostModal() { this.cashPostModalState.next(false) }

  openCashUpdateModal(id: number) {
    this.cashUpdateModalState.next(true)
    this.cashRegisterId.next(id);
  }

  closeUpdatePostModal() { this.cashUpdateModalState.next(false) }

  //handle update on registers list
  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  triggerUpdate() {
    this.refreshList.next();
  }

  getCashRegisters(): Observable<CashRegister[]> {
    if (!this.list$) {
      this.list$ = this.http.get<CashRegister[]>(`${this.url}`).pipe(
        shareReplay(1)
      )
    }
    return this.list$;
  }

  getCashRegisterById(id: number): Observable<CashRegister> {
    return this.http.get<CashRegister>(`${this.url}/${id}`)
  }

  createCashRegister(payload: CashRegister): Observable<any> {
    // this.getCashRegisters();
    return this.http.post(`${this.url}`, payload).pipe(
      tap(() => this.clearCache())
    )
  }

  clearCache() {
    this.list$ = undefined;
  }

  updateCashRegister(payload: CashRegister): Observable<any> {
    return this.http.put(`${this.url}`, payload)
      .pipe(catchError(handleNetworkError('update-cash-register')))
      .pipe(
        tap(() => this.clearCache())
      )
  }

  removeCashRegister(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(catchError(handleNetworkError('remove-cash-register')))
      .pipe(
        tap(() => {
          this.clearCache()
          this.triggerUpdate()
        })
      )
  }

  getDayAndMonthValueData(): Observable<DayAndMonthData> {
    return this.http.get<DayAndMonthData>(`${this.url}/monthtotal`);
  }
}
