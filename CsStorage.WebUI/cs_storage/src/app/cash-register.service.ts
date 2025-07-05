import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from  '@angular/common/http'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CashRegister } from '../models/CashRegister';

@Injectable({
  providedIn: 'root'
})
export class CashRegisterService {
  private url = "http://localhost:5103/api/cashregisters";
  constructor(private http: HttpClient) { }

  getCashRegisters(): Observable<CashRegister[]>{
    return this.http.get<CashRegister[]>(`${this.url}`);
  }

  createCashRegister(payload: CashRegister): Observable<any> {
    // this.getCashRegisters();
    return this.http.post(`${this.url}`, payload)
  }
}
