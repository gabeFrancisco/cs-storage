import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { Debt } from '../../models/Debt';
import { ModalType } from '../../utils/modalType';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  constructor(private http: HttpClient) { }

  private url = "http://localhost:5103/api/debts";

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

  getDebtById(id: number): Observable<Debt>{
    return this.http.get<Debt>(`${this.url}/${id}`);
  }

  createDebt(payload: Debt): Observable<any> {
    return this.http.post(this.url, payload);
  }
}
