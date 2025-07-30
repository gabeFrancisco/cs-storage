import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MissingProductService } from '../../../services/missing-product.service';

@Component({
  selector: 'app-missing-products-modal',
  standalone: false,
  templateUrl: './missing-products-modal.component.html',
  styleUrl: './missing-products-modal.component.css'
})
export class MissingProductsModalComponent {
  show = false;

  missingProductForm!: FormGroup;
  initialValues = null;

  constructor(private missingProductService: MissingProductService) {
    this.missingProductService.missingProductModalState$.subscribe((value) => {
      this.show = value;
    })

    this.missingProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      customerName: new FormControl(''),
      neededDay: new FormControl(''),
    })
  }

  close() {
    this.missingProductService.closeMissingProductModal();
  }

  submit() {
    this.missingProductService.openMissingProductModal();
   }
}
