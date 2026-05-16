import { Component, OnInit } from '@angular/core';
import { CashRegisterService } from '../../../services/cash-register.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cash-register-product-modal',
  standalone: false,
  templateUrl: './cash-register-product-modal.html',
  styleUrl: './cash-register-product-modal.css',
})
export class CashRegisterProductModal implements OnInit {
  show = false;
  private destroy$ = new Subject<void>

  constructor(private cashRegisterService: CashRegisterService) { }

  ngOnInit(): void {
    this.cashRegisterService.cashProductModalState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => (this.show = value))
  }

  close() {
    this.cashRegisterService.closeCashProductModalState();
  }
}
