import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-products-table',
  standalone: false,
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
})
export class ProductsTableComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  constructor(private productService: ProductService){}

  ngOnInit(): void {
    this.productService.triggerUpdate();
    this.productService.refreshList$.subscribe(() => this.fetchList())
  }

  fetchList(){
    this.productService.getProducts().subscribe({
      next: res => {
        this.products = res
      },
      complete: () => this.loading = false
    })
  }

  openProductModal(){
    this.productService.openProductPostModal();
  }
  openProductUpdateModal(id: number){}
  deleteProductModal(id: number){}
}
