import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-modal',
  standalone: false,
  templateUrl: './product-modal.component.html',
  styleUrl: './product-modal.component.css',
})
export class ProductModalComponent {
  show = false;

  productForm!: FormGroup;
  initialValues = null;

  constructor(private productService: ProductService){
    this.productService.productPostModalState$.subscribe((value) => {
      this.show = value
    })

    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      description: new FormControl(''),
      quantity: new FormControl(0, Validators.required),
      price: new FormControl(0),
      product_type: new FormControl(0, Validators.required),
      category_id: new FormControl(0, Validators.required)
    })

    this.initialValues = this.productForm.value;
  }

  close(){
    this.productService.closeProductPostModal();
  }
  submit(){}
}
