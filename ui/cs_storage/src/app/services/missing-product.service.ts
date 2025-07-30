import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MissingProduct } from '../../models/MissingProduct';

@Injectable({
  providedIn: 'root'
})
export class MissingProductService {

  constructor(private http: HttpClient) { }
  private url = "http://localhost:5103/api/missingproducts";

  //Modal variables
  private missingProductModalState = new BehaviorSubject<boolean>(false);
  missingProductModalState$ = this.missingProductModalState.asObservable();

  openMissingProductModal() { this.missingProductModalState.next(true)}
  closeMissingProductModal() { this.missingProductModalState.next(false)}

  getMissingProducts(): Observable<MissingProduct[]>{
    return this.http.get<MissingProduct[]>(this.url);
  }
}
