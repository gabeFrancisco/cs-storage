import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceOrder } from '../../../models/ServiceOrder';
import { ServiceOrderService } from '../../services/service-order.service';

@Component({
  selector: 'app-service-order-create',
  standalone: false,
  templateUrl: './service-order-create.component.html',
  styleUrl: './service-order-create.component.css'
})
export class ServiceOrderCreateComponent {

  serviceOrderForm!: FormGroup;
  initialValues = null;

  serviceOrder!: ServiceOrder;

  constructor(private serviceOrderService: ServiceOrderService,private router: Router) {
    this.serviceOrderForm = new FormGroup({
      title: new FormControl(""),
      description: new FormControl(""),
      service_date: new FormControl(""),
      value: new FormControl(0),
      customer_name: new FormControl(""),
      customer_phone: new FormControl(""),
      road: new FormControl(""),
      number: new FormControl(""),
      complement: new FormControl(""),
      neighborhood: new FormControl(""),
      city: new FormControl(""),
      state: new FormControl("")
    })
  }

  cancel(){
    this.router.navigate(["ordensDeServico"])
  }

  submit(){
    console.log(this.serviceOrderForm.value)
  }
}
