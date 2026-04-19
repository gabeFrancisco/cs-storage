import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../models/Category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private list$?: Observable<Category[]>;

  constructor(private http: HttpClient){ }
  private ulr = `${environment.apiUrl}/categories`;

}
