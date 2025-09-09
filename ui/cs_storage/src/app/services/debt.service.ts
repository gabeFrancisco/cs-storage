import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject, catchError, shareReplay, tap, map } from 'rxjs';
import { Debt } from '../../models/Debt';
import { ModalType } from '../../utils/modalType';
import { handleNetworkError } from '../../utils/errorHandler';
import { DayAndMonthData } from '../../models/ValueObjects/DayAndMonthData';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private list$?: Observable<Debt[]>;

  constructor(private http: HttpClient) { }
  private url = `${environment.apiUrl}/debts`;

  //Debt modal variables
  private debtPostModalState = new BehaviorSubject<boolean>(false);
  debtPostModalState$ = this.debtPostModalState.asObservable();

  private debtUpdateModalState = new BehaviorSubject<boolean>(false);
  debtUpdateModalState$ = this.debtUpdateModalState.asObservable();

  private debtId = new BehaviorSubject<number | null>(null);
  debtId$ = this.debtId.asObservable();

  openDebtPostModal() { this.debtPostModalState.next(true) }
  closeDebtPostModal() { this.debtPostModalState.next(false) }

  openDebtUpdateModal(id: number) {
    this.debtUpdateModalState.next(true)
    this.debtId.next(id);
  }
  closeDebtUpdateModal(){ this.debtUpdateModalState.next(false)}

  setDebtId(id: number) {
    this.debtId.next(id)
  }

  //handle update on registers list
  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  triggerUpdate() {
    this.refreshList.next();
  }

  //API calls
  getDebts(): Observable<Debt[]> {
    if (!this.list$) {
      this.list$ = this.http.get<Debt[]>(this.url).pipe(
        shareReplay(1)
      )
    }
    return this.list$;
  }

  clearCache() {
    this.list$ = undefined;
  }

  getDebtById(id: number): Observable<Debt> {
    return this.http.get<Debt>(`${this.url}/${id}`)
  }

  createDebt(payload: Debt): Observable<any> {
    return this.http.post(this.url, payload)
      .pipe(tap(() => this.clearCache()))
  }

  updateDebt(payload: Debt): Observable<any> {
    return this.http.put(this.url, payload)
      .pipe(catchError(handleNetworkError('update-debt')))
      .pipe(tap(() => this.clearCache()))
  }

  removeDebt(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(catchError(handleNetworkError('remove-debt')))
      .pipe(tap(() => this.clearCache()))
  }

  getDayAndMonthValueData(): Observable<DayAndMonthData>{
    return this.http.get<DayAndMonthData>(`${this.url}/monthtotal`)
  }
}
