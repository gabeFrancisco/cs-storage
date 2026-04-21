import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, shareReplay, tap } from 'rxjs';
import { Category } from '../../models/Category';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { handleNetworkError } from '../../utils/errorHandler';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private list$?: Observable<Category[]>;
  private url = `${environment.apiUrl}/categories`;

  private categoryId = new BehaviorSubject<number | null>(null);
  categoryId$ = this.categoryId.asObservable();

  private modalType = new BehaviorSubject<string | null>(null) ;
  modalType$ = this.modalType.asObservable();

  constructor(private http: HttpClient){ }

  private refreshList = new BehaviorSubject<void>(undefined);
  refreshList$ = this.refreshList.asObservable();

  triggerUpdate(){
    this.refreshList.next();
  }

  //modal variables
  private categoryModalState = new BehaviorSubject<boolean>(false);
  categoryModalState$ = this.categoryModalState.asObservable();

  openCategoryModal(mode: string, id?: number){
    this.categoryModalState.next(true);
    this.modalType.next(mode);
    this.categoryId.next(id!);
  }

  closeCategoryModal(){
    this.categoryModalState.next(false)
  }

  clearCache(){
    this.list$ = undefined;
  }

  getCategories(): Observable<Category[]>{
    if(!this.list$){
      this.list$ = this.http.get<Category[]>(this.url).pipe(shareReplay(1));
    }
    return this.list$;
  }

  createCategory(payload: Category): Observable<any>{
    return this.http.post(this.url, payload).pipe(
      tap(() => this.clearCache())
    )
  }

  getCategoryById(id: number){
    return this.getCategories().pipe(
      map(cat => cat.find(c => c.id === id))
    )
  }

  updateCategory(payload: Category): Observable<any>{
    return this.http.put(`${this.url}/${payload.id}`, payload)
    .pipe(catchError(handleNetworkError('update-category-error')))
    .pipe(tap(() => this.clearCache()))
  }
}
