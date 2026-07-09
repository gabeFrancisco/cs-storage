import { Component, OnInit } from '@angular/core';
import { Product } from '../../../../models/Product';
import { ProductService } from '../../../services/product.service';
import { ProductType } from '../../../../models/enums/ProductType';
import { FormControl } from '@angular/forms';
import { combineLatest, debounceTime, distinctUntilChanged, map, startWith } from 'rxjs';
import { faPen, faX } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-products-table',
  standalone: false,
  templateUrl: './products-table.component.html',
  styleUrl: './products-table.component.css',
})
export class ProductsTableComponent implements OnInit {
  faPen = faPen
  faX = faX;

  products: Product[] = [];
  loading = true;

  search = new FormControl("");

  parseProductType(id: number) {
    return ProductType[id];
  }

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.triggerUpdate();
    this.productService.refreshList$.subscribe(() => this.fetchList())

    combineLatest([
      this.productService.getProducts(),
      this.search.valueChanges.pipe(
        startWith(''),
        debounceTime(500),
        distinctUntilChanged()
      )
    ]).pipe(
      map(([products, term]) => {
        const searchTerm = (term ?? '').toLowerCase();

        return products.filter(product =>
          product.name.toLowerCase().includes(searchTerm)
        );
      })
    )
      .subscribe(products => {
        this.products = products;
        this.loading = false;
      });
  }

  fetchList() {
    this.search.patchValue("");
    this.productService.getProducts().subscribe({
      next: res => {
        this.products = res
      },
      complete: () => this.loading = false
    })
  }

  openProductModal() {
    this.productService.openProductPostModal();
  }
  openProductUpdateModal(id: number) { }
  deleteProductModal(id: number) { }
}
