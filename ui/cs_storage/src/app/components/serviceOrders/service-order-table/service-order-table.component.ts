import { Component } from '@angular/core';
import { ServiceOrder } from '../../../../models/ServiceOrder';

@Component({
  selector: 'app-service-order-table',
  standalone: false,
  templateUrl: './service-order-table.component.html',
  styleUrl: './service-order-table.component.css'
})
export class ServiceOrderTableComponent {
  serviceOrders: ServiceOrder[] = [];

  loading = true;

  fetchList(){}
}
