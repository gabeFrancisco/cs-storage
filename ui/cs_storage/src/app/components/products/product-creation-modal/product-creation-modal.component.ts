import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../../models/Category';
import { Product } from '../../../../models/Product';

@Component({
  selector: 'app-product-creation-modal',
  standalone: false,
  templateUrl: './product-creation-modal.component.html',
  styleUrl: './product-creation-modal.component.css',
})
export class ProductCreationModalComponent implements OnInit {
  show = false;
  categories: Category[] = [];

  productForm!: FormGroup;
  initialValues = null;


  constructor(private productService: ProductService, private categoryService: CategoryService){
    this.productService.productPostModalState$.subscribe((value) => {
      this.show = value
    })

    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      quantity: new FormControl(0, Validators.required),
      price: new FormControl(0),
      product_type: new FormControl(0, Validators.required),
      category_id: new FormControl(0, [Validators.required, Validators.min(1)])
    })

    this.initialValues = this.productForm.value;
  }

  ngOnInit(): void {
    this.categoryService.triggerUpdate();
    this.categoryService.refreshList$.subscribe(() => this.fetchCategories())
  }

  fetchCategories(){
    this.categoryService.getCategories().subscribe({
      next: res => {
        this.categories = res
      }
    })
  }
  close(){
    this.productService.closeProductPostModal();
  }
  submit(){
    let product = this.productForm.value as Product;

    if(this.productForm.invalid){
      return;
    }

    this.productService.createProduct(product).subscribe({
      next: () => {
        this.productForm.reset(this.initialValues);
        this.productService.closeProductPostModal();
        this.productService.triggerUpdate();
      }
    })
  }
}
