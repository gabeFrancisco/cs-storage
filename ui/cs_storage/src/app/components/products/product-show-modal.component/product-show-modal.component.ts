import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Product } from '../../../../models/Product';
import { ProductService } from '../../../services/product.service';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'app-product-show-modal',
  standalone: false,
  templateUrl: './product-show-modal.component.html',
  styleUrl: './product-show-modal.component.css',
})
export class ProductShowModalComponent implements OnInit{
  show = false;
  productForm!: FormGroup;
  product!: Product;

  constructor(private productService: ProductService, private categoryService: CategoryService){
    this.productService.productViewModalState$.subscribe((value) => {
      this.show = value
    })
  }

  ngOnInit(): void {
    this.productForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      quantity: new FormControl(0, Validators.required),
      price: new FormControl(0),
      product_type: new FormControl(0, Validators.required),
      category_id: new FormControl(0, [Validators.required, Validators.min(1)])
    })
  }
}
