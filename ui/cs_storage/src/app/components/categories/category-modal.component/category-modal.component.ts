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

  constructor(private categoryService: CategoryService){
    this.categoryService.categoryModalState$.subscribe(value => this.show = value)
    this.categoryService.categoryId$.subscribe(value => this.categoryId = value!)
    this.categoryService.modalType$.subscribe(value => {
      this.mode = value!;
      this.readOnly = (this.mode === 'read');
    })

  }

  ngOnInit(): void {
    this.categoryForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl("", Validators.required),
      description: new FormControl(""),
      color: new FormControl("#777"),
    })
    this.initialValues = this.categoryForm.value;
  }


  close(){
    this.categoryService.closeCategoryModal()
  }

  submit(){
    let category = this.categoryForm.value as Category;
    delete category.id;

    if(this.categoryForm.invalid){
      return;
    }

    this.categoryService.createCategory(category).subscribe({
      next: () => {
        this.categoryForm.reset(this.initialValues);
        this.categoryService.closeCategoryModal();
        this.categoryService.triggerUpdate();
      }
    })
  }
}
