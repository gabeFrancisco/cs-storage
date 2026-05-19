import { Component, OnDestroy, OnInit } from '@angular/core';
import { CashRegisterService } from '../../../services/cash-register.service';
import { Subject, takeUntil } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../../models/Product';

@Component({
  selector: 'app-cash-register-product-modal',
  standalone: false,
  templateUrl: './cash-register-product-modal.html',
  styleUrl: './cash-register-product-modal.css',
})
export class CashRegisterProductModal implements OnInit, OnDestroy {
  show = false;
  private destroy$ = new Subject<void>
  faSearch = faSearch;
  loading = true;
  products: Product[] = [];
  selectedProduct?: Product;

  constructor(private cashRegisterService: CashRegisterService, private productsService: ProductService) { }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.cashRegisterService.cashProductModalState$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => (this.show = value))

    this.productsService.getProducts().subscribe({
      next: res => {
        this.products = res
      },
      complete: () => this.loading = false
    })
  }

  selectProduct(id: number) {
    this.selectedProduct = { ...this.products.find(el => el.id === id) } as Product;
  }

  confirmProduct() {
    this.cashRegisterService.selectProduct(this.selectedProduct!)
    this.cashRegisterService.closeCashProductModalState();
  }

  close() {
    this.cashRegisterService.closeCashProductModalState();
  }
}
