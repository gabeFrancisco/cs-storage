import { Injectable } from '@angular/core';
import { ServiceOrder } from '../../models/ServiceOrder';
import { BehaviorSubject, catchError, map, Observable, of, shareReplay, tap } from 'rxjs';
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

  private serviceOrderId = new BehaviorSubject<number | null>(null);
  serviceOrderId$ = this.serviceOrderId.asObservable();

  private formMode = new BehaviorSubject<string | null>(null);
  formMode$ = this.formMode.asObservable();

  setEdit(value: boolean) {
    this.edit.next(value);
  }

  constructor(private http: HttpClient) { }


  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  setFormMode(mode: string) {
    this.formMode.next(mode);
  }

  getServiceOrders(): Observable<ServiceOrder[]> {
    if (!this.list$) {
      this.list$ = this.http.get<ServiceOrder[]>(this.url).pipe(
        shareReplay(1)
      )
    }
    return this.list$
  }

  triggerUpdate() {
    this.refreshList.next();
  }

  clearCache() {
    this.list$ = undefined;
  }

  getCachedServiceOrderById(id: number): Observable<ServiceOrder | undefined> {
    return this.list$!.pipe(
      map(so => so.find(x => x.id === id))
    )
  }

  setServiceOrderId(id: number | null) {
    this.serviceOrderId.next(id);
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
