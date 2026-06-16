import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../../models/Category';
import { FormControl } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';

@Component({
  selector: 'app-category-table',
  standalone: false,
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
})
export class CategoryTableComponent implements OnInit {
  loading = true;
  categories: Category[] = []

  search = new FormControl('')

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.triggerUpdate();
    this.categoryService.refreshList$.subscribe(() => {
      this.fetchList()
    })

    combineLatest([
      this.categoryService.getCategories(),
      this.search.valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([categories, term]) => {
        const searchTerm = (term ?? '').toLowerCase();

        return categories.filter(cat =>
          cat.name.toLowerCase().includes(searchTerm)
        )
      })
    )
      .subscribe(cats => {
        this.categories = cats;
        this.loading = false;
      })
  }

  fetchList() {
    this.categoryService.getCategories().subscribe({
      next: res => this.categories = res,
      complete: () => this.loading = false
    })
  }
  openModal(mode: string, id?: number) {
    this.categoryService.openCategoryModal(mode, id);
  }
  deleteCategory(id: number) {
    if (confirm("Tem certeza que deseja remover essa categoria?")) {
      this.categoryService.removeCategory(id).subscribe(() => this.fetchList());
    }
  }
}
