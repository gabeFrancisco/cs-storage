import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user!: User;
  private url = "http://10.0.10.250:8000/api/users";

  constructor(private http: HttpClient) { }

  login({ email, password }: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, password }, { withCredentials: true })
  }
}
