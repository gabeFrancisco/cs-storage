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

  modalType: ModalType | null = null;

  constructor(private missingProductService: MissingProductService) {
    this.missingProductService.missingProductModalState$.subscribe((value) => {
      this.show = value;
    })

    this.missingProductForm = new FormGroup({
      id: new FormControl(0),
      name: new FormControl(null, Validators.required),
      customer_name: new FormControl(''),
      customer_phone: new FormControl(''),
      needed_day: new FormControl(new Date().toISOString().split('T')[0], Validators.required),
      image_url: new FormControl('')
    })

    this.missingProductService.missingProductModalType$.subscribe(value => {
      this.modalType = value;
    })
  }

  close() {
    this.missingProductService.closeMissingProductModal();
  }

  submit() {
    if (this.missingProductForm.invalid) {
      console.log(this.missingProductForm.errors)
      console.log(this.missingProductForm.status)
      console.log(this.modalType);
      return
    }

    this.missingProduct = {
      id: this.missingProductForm.get('id')!.value ?? 0,
      name: this.missingProductForm.get('name')!.value,
      image_url: this.missingProductForm.get('image_url')!.value,
      is_bought: false,
      needed_day: this.missingProductForm.get('needed_day')!.value,
      customer: {
        name: this.missingProductForm.get('customer_name')!.value,
        phone: this.missingProductForm.get('customer_phone')!.value
      }
    }

    if (this.modalType === ModalType.CREATE) {
      this.missingProductService.createMissingProduct(this.missingProduct).subscribe({
        next: _ => {
          this.missingProductForm.reset();
          this.missingProductService.triggerUpdate();
        },
        error: err => console.log(err)
      })
      this.missingProductService.closeMissingProductModal();
    }
  }
}
