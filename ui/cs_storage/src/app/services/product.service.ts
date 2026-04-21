import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { Product } from '../../models/Product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private list$?: Observable<Product[]>;

  constructor(private http: HttpClient){ }
  private url = `${environment.apiUrl}/products`;

  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  //modal variables
  private productPostModalState = new BehaviorSubject<boolean>(false);
  productPostModalState$ = this.productPostModalState.asObservable();

  openProductPostModal() { this.productPostModalState.next(true)}
  closeProductPostModal() { this.productPostModalState.next(false)}

  private productViewModalState = new BehaviorSubject<boolean>(false);
  productViewModalState$ = this.productViewModalState.asObservable();

  openProductViewModal(id: number) {
    this.productViewModalState.next(true)
    this.productId.next(id)
  }

  closeProductViewModal() { this.productViewModalState.next(false)}

  private productId = new BehaviorSubject<number | null>(null)
  productId$ = this.productId.asObservable();

  triggerUpdate(){
    this.refreshList.next();
  }

  getProducts(): Observable<Product[]>{
    if(!this.list$){
      this.list$ = this.http.get<Product[]>(`${this.url}`).pipe(shareReplay(1))
    }
      return this.list$;
  }

  createProduct(payload: Product): Observable<any>{
    return this.http.post(`${this.url}`, payload).pipe(
      tap(() => this.clearCache())
    )
  }

  clearCache(){
    this.list$ = undefined
  }
}
