import { Injectable } from '@angular/core';
import { ServiceOrder } from '../../models/ServiceOrder';
import { BehaviorSubject, catchError, Observable, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { handleNetworkError } from '../../utils/errorHandler';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {
  private list$?: Observable<ServiceOrder[]>;
  private url = "http://127.0.0.1:8000/api/serviceorders"

  constructor(private http: HttpClient) { }

  getServiceOrders(): Observable<ServiceOrder[]>{
    if(!this.list$){
      this.list$ = this.http.get<ServiceOrder[]>(this.url).pipe(
        shareReplay(1)
      )
    }
    return this.list$
  }

  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  triggerUpdate(){
    this.refreshList.next();
  }

  clearCache(){
    this.list$ = undefined;
  }

  createServiceOrder(payload: ServiceOrder): Observable<any>{
    return this.http.post(this.url, payload)
      .pipe(catchError(handleNetworkError('create-service-order')))
      .pipe(tap(() => this.clearCache()))
  }
}
