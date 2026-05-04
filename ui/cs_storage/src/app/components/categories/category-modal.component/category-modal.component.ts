import { Component, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../../../models/Category';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../services/category.service';
import { combineLatest, filter, pipe, Subject, switchMap, takeUntil } from 'rxjs';

type ModalMode = 'read' | 'create' | 'update';

@Component({
  selector: 'app-category-modal',
  standalone: false,
  templateUrl: './category-modal.component.html',
  styleUrl: './category-modal.component.css',
})


export class CategoryModalComponent implements OnInit, OnDestroy {
  show = false;

  mode: ModalMode = 'read';
  get readOnly() {
    return this.mode === 'read';
  }

  categoryId = 0;
  initialValues = null;
  private destroy$ = new Subject<void>;

  categoryForm = new FormGroup({
    id: new FormControl<number>(0),
    name: new FormControl("", Validators.required),
    description: new FormControl(""),
    color: new FormControl("#777"),
  })

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryService.categoryModalState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => (this.show = value));

    this.categoryService.modalType$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => (this.mode = value as ModalMode));

    combineLatest([
      this.categoryService.categoryId$,
      this.categoryService.modalType$
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(([id, mode]) => !!id && mode !== 'create'),
        switchMap(([id]) => this.categoryService.getCategoryById(id!))
      )
      .subscribe(cat => {
        if (cat) this.categoryForm.patchValue(cat)
      });

    this.categoryService.modalType$
      .pipe(
        takeUntil(this.destroy$),
        filter(mode => mode === 'create')
      )
      .subscribe(() => this.categoryForm.reset());

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  close() {
    this.categoryService.closeCategoryModal()
  }

  submit() {
    if (this.mode === 'read') {
      this.categoryService.setCategoryModalType('update');
      return;
    }

    if (this.categoryForm.invalid) {
      return;
    }

    const category = this.categoryForm.value as Category;
    const request$ =
      this.mode === 'create'
        ? this.categoryService.createCategory({ ...category, id: undefined })
        : this.categoryService.updateCategory(category);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.onSuccess()
    })
  }

  private onSuccess() {
    this.categoryForm.reset();
    this.categoryService.closeCategoryModal();
    this.categoryService.triggerUpdate();
  }
}
