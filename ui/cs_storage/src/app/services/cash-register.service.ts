import { CashRegister } from './../../models/CashRegister';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, ReplaySubject, shareReplay, Subject, tap } from 'rxjs';
import { handleNetworkError } from '../../utils/errorHandler';
import { DayAndMonthData } from '../../models/ValueObjects/DayAndMonthData';
import { environment } from '../../environments/environment';
import { Product } from '../../models/Product';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {
  private list$?: Observable<CashRegister[]>;
  private dateList?: Observable<CashRegister[]>;
  private selectedProduct = new BehaviorSubject<Product | null>(null);
  selectedProduct$ = this.selectedProduct.asObservable();

  constructor(private http: HttpClient) { }
  private url = `${environment.apiUrl}/cashregisters`;

  selectProduct(product: Product) {
    this.selectedProduct.next(product!);
  }

  private modalType = new BehaviorSubject<string | null>(null);
  modalType$ = this.modalType.asObservable();

  private cashModalState = new BehaviorSubject<boolean>(false);
  cashModalState$ = this.cashModalState.asObservable();

  //cash modal variables
  private cashPostModalState = new BehaviorSubject<boolean>(false);
  cashPostModalState$ = this.cashPostModalState.asObservable();

  private cashUpdateModalState = new BehaviorSubject<boolean>(false);
  cashUpdateModalState$ = this.cashUpdateModalState.asObservable();

  private cashProductModalState = new BehaviorSubject<boolean>(false);
  cashProductModalState$ = this.cashProductModalState.asObservable();

  private cashRegisterId = new BehaviorSubject<number | null>(null)
  cashRegisterId$ = this.cashRegisterId.asObservable();

  openCashModal(mode: string, id?: number) {
    this.cashModalState.next(true);
    this.modalType.next(mode);
    this.cashRegisterId.next(id!);
  }

  setCashModalType(mode: string) {
    this.modalType.next(mode);
  }

  closeCashModal() {
    this.cashModalState.next(false);
  }

  openCashPostModal() { this.cashPostModalState.next(true) }
  closeCashPostModal() { this.cashPostModalState.next(false) }

  openCashUpdateModal(id: number) {
    this.cashUpdateModalState.next(true)
    this.cashRegisterId.next(id);
  }

  openCashProductModal() {
    this.cashProductModalState.next(true);
  }

  closeCashProductModalState() { this.cashProductModalState.next(false) }

  closeUpdatePostModal() { this.cashUpdateModalState.next(false) }

  //handle update on registers list
  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  triggerUpdate() {
    this.refreshList.next();
  }

  getCashRegisters(date: string): Observable<CashRegister[]> {
    return this.http.get<CashRegister[]>(`${this.url}/getall/${date}`).pipe(
      shareReplay(1)
    )
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
