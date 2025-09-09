import { MissingProduct } from './../../models/MissingProduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, shareReplay, tap } from 'rxjs';
import { ModalType } from '../../utils/modalType';
import { handleNetworkError } from '../../utils/errorHandler';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MissingProductService {
  private list$?: Observable<MissingProduct[]>;

  constructor(private http: HttpClient) { }
  private url = `${environment.apiUrl}/missingproducts`;

  //Modal type for reuse
  private missingProductModalType = new BehaviorSubject<ModalType | null>(null);
  missingProductModalType$ = this.missingProductModalType.asObservable();

  //Modal variables
  private missingProductModalState = new BehaviorSubject<boolean>(false);
  missingProductModalState$ = this.missingProductModalState.asObservable();

  private missingProductId = new BehaviorSubject<number | null>(null);
  missingProductId$ = this.missingProductId.asObservable();

  openMissingProductModal() { this.missingProductModalState.next(true) }
  closeMissingProductModal() { this.missingProductModalState.next(false) }

  setModalTypeToCreate() { this.missingProductModalType.next(ModalType.CREATE) }
  setModalTypeToUpdate() { this.missingProductModalType.next(ModalType.UPDATE) }
  setModalTypeToRead() { this.missingProductModalType.next(ModalType.READ) }

  setMissingProductId(id: number) {
    this.missingProductId.next(id);
  }

  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  triggerUpdate() {
    this.refreshList.next();
  }

  //API calls
  getMissingProducts(): Observable<any> {
    if (!this.list$) {
      this.list$ = this.http.get<MissingProduct[]>(this.url).pipe(
        shareReplay(1)
      )
    }
    return this.list$;
  }

  clearCache() {
    this.list$ = undefined;
  }

  createMissingProduct(payload: MissingProduct): Observable<any> {
    this.clearCache();
    return this.http.post(this.url, payload);
  }

  setMissingProductBoughtState(payload: { id: number, state: boolean }) {
    this.clearCache();
    return this.http.post(`${this.url}/setstate`, payload);
  }

  removeMissingProduct(id: number): Observable<any>{
    return this.http.delete(`${this.url}/?id=${id}`)
    .pipe(catchError(handleNetworkError('remove-missing-product')))
    .pipe(tap(() => this.clearCache()))
  }

  removeAllBought(): Observable<any>{
    return this.http.delete(`${this.url}/deleteallbought`)
    .pipe(catchError(handleNetworkError('remove-all-bought-missing-products')))
    .pipe(tap(() => this.clearCache()))
  }
}
