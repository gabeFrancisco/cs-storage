import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CashRegisterService } from '../../../services/cash-register.service';
import { Component, OnInit } from '@angular/core';
import { CashRegister } from '../../../../models/CashRegister';
import { Product } from '../../../../models/Product';
import { faArrowUp, faBoxOpen, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cash-post-modal',
  standalone: false,
  templateUrl: './cash-post-modal.component.html',
  styleUrl: './cash-post-modal.component.css'
})
export class CashPostModalComponent implements OnInit {
  show = false;

  cashForm!: FormGroup;
  initialValues = null;
  product?: Product;
  faUp = faMagnifyingGlass;

  constructor(private cashRegisterService: CashRegisterService) {
    this.cashRegisterService.cashPostModalState$.subscribe((value) => {
      this.show = value
    })

    this.cashForm = new FormGroup({
      product_id: new FormControl(-1, Validators.required),
      quantity: new FormControl(1, Validators.required),
      payment_type: new FormControl(0),
      value: new FormControl(0, [Validators.required, Validators.min(0.1)]),
      created_at: new FormControl(new Date().toISOString().split('T')[0], Validators.required)
    })

    this.initialValues = this.cashForm.value;
  }

  ngOnInit(): void {
    this.cashRegisterService.selectedProduct$.subscribe(value => {
      this.product = value!
      this.cashForm.get('product_id')!.patchValue(value?.id)
    })
  }

  openProductModal() {
    this.cashRegisterService.openCashProductModal();
  }

  close() {
    this.cashRegisterService.closeCashPostModal();
  }

  get product_id() {
    return this.cashForm.get('product_id')!;
  }

  get quantity() {
    return this.cashForm.get('quantity')!;
  }

  get value() {
    return this.cashForm.get('value')!;
  }

  get created_at() {
    return this.cashForm.get('created_at')!;
  }

  submit() {
    let register = this.cashForm.value as CashRegister;

    if (this.cashForm.invalid) {
      return;
    }

    this.cashRegisterService.createCashRegister(register).subscribe({
      next: (item) => {
        this.cashForm.reset(this.initialValues);
        this.cashRegisterService.closeCashPostModal();
        this.cashRegisterService.triggerUpdate();
      }
    }
    )
  }
}
