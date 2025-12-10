import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/User';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private user!: User;
  private url = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) { }

  login({ email, password }: { email: string, password: string }): Observable<any> {
    return this.http.post(`${this.url}/login`, { email, password }, { withCredentials: true })
  }
}
