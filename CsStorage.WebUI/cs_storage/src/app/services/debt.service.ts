import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Debt } from '../../models/Debt';

@Injectable({
  providedIn: 'root'
})
export class DebtService {
  private url = "http://localhost:5103/api/debts";
  constructor(private http: HttpClient) { }

  getDebts(): Observable<Debt[]>{
    return this.http.get<Debt[]>(this.url);
  }
}
