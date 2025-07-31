import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject, catchError } from 'rxjs';
import { Debt } from '../../models/Debt';
import { ModalType } from '../../utils/modalType';
import { handleNetworkError } from '../../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  constructor(private http: HttpClient) { }

  private url = "http://127.0.0.1:8000/api/debts";

  //Modal type for reuse
  private debtModalType = new BehaviorSubject<ModalType | null>(null);
  debtPostType$ = this.debtModalType.asObservable();

  //Debt modal variables
  private debtPostModalState = new BehaviorSubject<boolean>(false);
  debtPostModalState$ = this.debtPostModalState.asObservable();

  private debtId = new BehaviorSubject<number | null>(null);
  debtId$ = this.debtId.asObservable();

  openDebtPostModal() { this.debtPostModalState.next(true) }
  closeDebtPostModal() { this.debtPostModalState.next(false) }

  setModalTypeToCreate() { this.debtModalType.next(ModalType.CREATE) }
  setModalTypeToUpdate() { this.debtModalType.next(ModalType.UPDATE) }
  setModalTypeToRead() { this.debtModalType.next(ModalType.READ) }

  setDebtId(id: number){
    this.debtId.next(id)
  }

  //handle update on registers list
  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  triggerUpdate() {
    this.refreshList.next();
  }

  getDebts(): Observable<Debt[]> {
    return this.http.get<Debt[]>(this.url);
  }

  getDebtById(id: number): Observable<Debt>{
    return this.http.get<Debt>(`${this.url}/${id}`);
  }

  createDebt(payload: Debt): Observable<any> {
    return this.http.post(this.url, payload);
  }

  updateDebt(payload: Debt): Observable<any>{
    return this.http.put(this.url, payload)
    .pipe(catchError(handleNetworkError('update-debt')))
  }

  removeDebt(id: number): Observable<any>{
    return this.http.delete(`${this.url}/${id}`)
      .pipe(catchError(handleNetworkError('remove-debt')))
  }
}
