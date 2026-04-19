import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay } from 'rxjs';
import { Category } from '../../models/Category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private list$?: Observable<Category[]>;

  constructor(private http: HttpClient){ }
  private url = `${environment.apiUrl}/categories`;

  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  triggerUpdate(){
    this.refreshList.next();
  }

  getCategories(): Observable<Category[]>{
    return this.http.get<Category[]>(this.url).pipe(shareReplay(1))
  }

  clearCache(){
    this.list$ = undefined;
  }
}
