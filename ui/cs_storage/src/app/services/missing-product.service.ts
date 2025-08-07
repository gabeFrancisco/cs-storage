import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MissingProduct } from '../../models/MissingProduct';
import { ModalType } from '../../utils/modalType';

@Injectable({
  providedIn: 'root'
})
export class MissingProductService {

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

  openMissingProductModal() { this.missingProductModalState.next(true)}
  closeMissingProductModal() { this.missingProductModalState.next(false)}

  setModalTypeToCreate() { this.missingProductModalType.next(ModalType.CREATE) }
  setModalTypeToUpdate() { this.missingProductModalType.next(ModalType.UPDATE) }
  setModalTypeToRead() { this.missingProductModalType.next(ModalType.READ) }

  setMissingProductId(id: number){
    this.missingProductId.next(id);
  }

  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  triggerUpdate(){
    this.refreshList.next();
  }

  //API calls
  getMissingProducts(): Observable<MissingProduct[]>{
    return this.http.get<MissingProduct[]>(this.url);
  }

  createMissingProduct(payload: MissingProduct): Observable<any>{
    return this.http.post(this.url, payload);
  }
}
