import { MissingProduct } from './../../models/MissingProduct';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { ModalType } from '../../utils/modalType';

@Injectable({
  providedIn: 'root'
})
export class MissingProductService {
  private list$?: Observable<MissingProduct[]>;

  constructor(private http: HttpClient) { }
  private url = "http://127.0.0.1:8000/api/missingproducts";

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
}
