import { Component, OnInit } from '@angular/core';
import { MissingProduct } from '../../../../models/MissingProduct';
import { MissingProductService } from '../../../services/missing-product.service';

@Component({
  selector: 'app-missing-products-table',
  standalone: false,
  templateUrl: './missing-products-table.component.html',
  styleUrl: './missing-products-table.component.css'
})
export class MissingProductsTableComponent implements OnInit{
  products: MissingProduct[] = [];
  loading = true;

  constructor(private missingProductService: MissingProductService){}

  ngOnInit(): void {
    this.missingProductService.triggerUpdate();
    this.missingProductService.refreshList$.subscribe(() => {
      this.fetchList();
    })
  }

  fetchList(){
    this.missingProductService.getMissingProducts().subscribe({
      next: res => {
        this.products = res
      }, complete: () => this.loading = false
    })
  }

  openMissingProductModal(){
    this.missingProductService.setModalTypeToCreate();
    this.missingProductService.openMissingProductModal();
  }
}
