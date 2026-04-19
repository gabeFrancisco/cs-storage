import { Component } from '@angular/core';
import { Product } from '../../../../models/Product';

@Component({
  selector: 'app-products-table',
  standalone: false,
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
})
export class ProductsTableComponent {
  products: Product[] = [];
  loading = true;

  fetchList(){}
  openProductModal(){}
  openProductUpdateModal(id: number){}
  deleteProductModal(id: number){}
}
