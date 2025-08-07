import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MissingProductService } from '../../../services/missing-product.service';
import { MissingProduct } from '../../../../models/MissingProduct';
import { ModalType } from '../../../../utils/modalType';

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

  missingProduct!: MissingProduct;

  modalType!: ModalType;

  constructor(private missingProductService: MissingProductService) {
    this.missingProductService.missingProductModalState$.subscribe((value) => {
      this.show = value;
    })

    this.missingProductForm = new FormGroup({
      name: new FormControl('', Validators.required),
      customer_name: new FormControl(''),
      needed_day: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
    })
  }

  close() {
    this.missingProductService.closeMissingProductModal();
  }

  submit() {
    this.missingProductService.openMissingProductModal();
   }
}
