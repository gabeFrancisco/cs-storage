import { Component, OnInit } from '@angular/core';
import { Category } from '../../../../models/Category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-category-modal',
  standalone: false,
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css',
})
export class CategoryModalComponent implements OnInit {
  show = false;
  categoryForm!: FormGroup
  mode: string = 'read'
  categoryId = 0;
  readOnly = false;
  initialValues = null;

  constructor(private categoryService: CategoryService) {
    this.categoryService.categoryModalState$.subscribe(value => this.show = value)
    this.categoryService.modalType$.subscribe(value => {
      this.mode = value!;
      this.readOnly = (this.mode === 'read');
    })

    this.categoryService.categoryId$.subscribe(value => {
      this.categoryId = value!;

      if (this.categoryId && this.mode !== 'create') {
        this.categoryService.getCategoryById(this.categoryId)
          .subscribe(cat => this.categoryForm.patchValue(cat!))
      } else {
        this.categoryForm.reset(this.initialValues);
      }

    })

    this.categoryForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.required),
      description: new FormControl(""),
      color: new FormControl("#777"),
    })
  }

  ngOnInit(): void {
  }


  close() {
    this.categoryService.closeCategoryModal()
  }

  submit() {
    if (this.mode === 'read') {
      this.categoryService.setCategoryModalType('update');
      return;
    }

    let category = this.categoryForm.value as Category;

    if (this.categoryForm.invalid) {
      return;
    }

    if (this.mode === 'create') {
      delete category.id;
      this.submitPost(category)
    }
    else if (this.mode === 'update') {
      console.log(category)
      this.submitUpdate(category);
    }
  }

  private submitPost(category: Category) {
    this.categoryService.createCategory(category).subscribe({
      next: () => {
        this.categoryForm.reset(this.initialValues);
        this.categoryService.closeCategoryModal();
        this.categoryService.triggerUpdate();
      }
    })
  }

  private submitUpdate(category: Category) {
    this.categoryService.updateCategory(category).subscribe({
      next: () => {
        this.categoryForm.reset(this.initialValues);
        this.categoryService.closeCategoryModal();
        this.categoryService.triggerUpdate();
      }
    })
  }
}
