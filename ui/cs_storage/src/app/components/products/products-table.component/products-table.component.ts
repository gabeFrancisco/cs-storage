import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/Product';
import { ProductService } from '../../../services/product.service';
import { ProductType } from '../../../../models/enums/ProductType';

@Component({
  selector: 'app-products-table',
  standalone: false,
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
})
export class ProductsTableComponent implements OnInit {
  products: Product[] = [];
  loading = true;

  parseProductType(id: number){
    return ProductType[id];
  }

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
