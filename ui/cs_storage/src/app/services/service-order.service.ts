import { Injectable } from '@angular/core';
import { ServiceOrder } from '../../models/ServiceOrder';
import { BehaviorSubject, catchError, map, Observable, shareReplay, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { handleNetworkError } from '../../utils/errorHandler';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceOrderService {
  private list$?: Observable<ServiceOrder[]>;
  private url = `${environment.apiUrl}/serviceorders`;

  private edit = new BehaviorSubject<boolean>(false);
  edit$ = this.edit.asObservable();

  setEdit(value: boolean){
    this.edit.next(value);
  }

  constructor(private http: HttpClient) { }

  getServiceOrders(): Observable<ServiceOrder[]> {
    if (!this.list$) {
      this.list$ = this.http.get<ServiceOrder[]>(this.url).pipe(
        shareReplay(1)
      )
    }
    return this.list$
  }

  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  triggerUpdate() {
    this.refreshList.next();
  }

  clearCache() {
    this.list$ = undefined;
  }

  getCachedServiceOrderById(id: number) {
    return this.list$?.pipe(
      map(so => so.find(x => x.id === id))
    )
  }

  createServiceOrder(payload: ServiceOrder): Observable<any> {
    return this.http.post(this.url, payload)
      .pipe(catchError(handleNetworkError('create-service-order')))
      .pipe(tap(() => this.clearCache()))
  }

  updateServiceOrder(payload: ServiceOrder): Observable<any> {
    return this.http.put(this.url, payload)
      .pipe(catchError(handleNetworkError('update-service-order')))
      .pipe(tap(() => this.clearCache()))
  }

  removeServiceOrder(id: number): Observable<any> {
    return this.http.delete(`${this.url}/${id}`)
      .pipe(catchError(handleNetworkError('remove-service-order')))
      .pipe(tap(() => this.clearCache()))
  }
}
