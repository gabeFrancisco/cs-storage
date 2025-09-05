import { Component, OnInit } from '@angular/core';
import { ServiceOrder } from '../../../../models/ServiceOrder';
import { ServiceOrderService } from '../../../services/service-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-service-order-table',
  standalone: false,
  templateUrl: './service-order-table.component.html',
  styleUrl: './service-order-table.component.css'
})
export class ServiceOrderTableComponent implements OnInit {
  serviceOrders: ServiceOrder[] = [];

  loading = true;

  constructor(private serviceOrderService: ServiceOrderService, private router: Router) { }

  ngOnInit(): void {
    this.serviceOrderService.triggerUpdate();
    this.serviceOrderService.refreshList$.subscribe(() => {
      this.fetchList();
    })
  }

  fetchList() {
    this.serviceOrderService.getServiceOrders().subscribe({
      next: res => {
        this.serviceOrders = res
      }, complete: () => this.loading = false
    })
  }

  newServiceOrder() {
    this.router.navigate(["ordensDeServico/novo"])
  }

  remove(id: number) {
    if (confirm("Tem certeza que deseja remover essa ordem de serviço?")) {
      this.serviceOrderService.removeServiceOrder(id).subscribe(() => {
        this.fetchList()
      });
    }
  }
}
