import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../../models/Category';

@Component({
  selector: 'app-category-table',
  standalone: false,
  templateUrl: './category-table.component.html',
  styleUrl: './category-table.component.css',
})
export class CategoryTableComponent implements OnInit {
  loading = true;
  categories: Category[] = []

  constructor(private categoryService: CategoryService){ }

  ngOnInit(): void {
    this.categoryService.triggerUpdate();
    this.categoryService.refreshList$.subscribe(() => {
      this.fetchList()
    })
  }

  fetchList(){
    this.categoryService.getCategories().subscribe({
      next: res => this.categories = res,
      complete: () => this.loading = false
    })
  }
  openModal(mode: string, id?: number){
    this.categoryService.openCategoryModal(mode, id);
  }
  deleteCategory(id: number){}
}
