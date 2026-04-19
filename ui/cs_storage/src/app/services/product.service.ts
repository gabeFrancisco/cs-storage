import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Product } from '../../models/Product';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private $list?: Observable<Product[]>;

  constructor(private http: HttpClient){ }
  private url = `${environment.apiUrl}/products`;

  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  //modal variables
  private productPostModalState = new BehaviorSubject<boolean>(false);
  productPostModalState$ = this.productPostModalState.asObservable();

  triggerUpdate(){
    this.refreshList.next;
  }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.url}`).pipe(shareReplay(1))
  }

  openProductPostModal() { this.productPostModalState.next(true)}
  closeProductPostModal() { this.productPostModalState.next(false)}
}
