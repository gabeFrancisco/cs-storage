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

  setBoughtState(id: number){
    if(confirm('Tem certeza que quer marcar este produto como "Comprado"?')){
      this.missingProductService.setMissingProductBoughtState({id: id, state: true})
        .subscribe(() => {
          this.fetchList();
        })
    }
  }

  getLateDate(date: string): boolean{
    let formateDate = new Date(date);
    if(formateDate.getTime() < new Date().getTime()){
      return true;
    }

    return false;
  }

  deleteMissingProduct(id: number){
    if(confirm("Tem certeza que deseja remover este registro?")){
      this.missingProductService.removeMissingProduct(id).subscribe(() => {
        this.fetchList();
      })
    }
  }

  deleteAllBought(){
    if(confirm("Todos os produtos comprados irão ficar registrados em um log guardado no sistema. Procede com a remoção?")){
      this.missingProductService.removeAllBought().subscribe(() => {
        this.fetchList()
      })
    }
  }
}
