import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  serviceOrder!: ServiceOrder;

  constructor(private serviceOrderService: ServiceOrderService,private router: Router) {
    this.serviceOrderForm = new FormGroup({
      hasAddress: new FormControl(false),
      title: new FormControl("", Validators.required),
      description: new FormControl("", Validators.required),
      priority: new FormControl(1, Validators.required),
      service_date: new FormControl("", Validators.required),
      value: new FormControl(0),
      customer_name: new FormControl("", Validators.required),
      customer_phone: new FormControl("", Validators.required),
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
    if(this.serviceOrderForm.invalid){
      return;
    }
    this.serviceOrder = {
      title: this.serviceOrderForm.get('title')!.value,
      description: this.serviceOrderForm.get('description')!.value,
      priority: this.serviceOrderForm.get('priority')!.value,
      service_date: this.serviceOrderForm.get('service_date')!.value,
      value: this.serviceOrderForm.get('value')!.value,
      customer: {
        name: this.serviceOrderForm.get('customer_name')!.value,
        phone: this.serviceOrderForm.get('customer_phone')!.value,
        cpf_cnpj: undefined,
        address: undefined
      },
      address: {
        road: this.serviceOrderForm.get('road')!.value ?? "",
        number: this.serviceOrderForm.get('number')!.value ?? "",
        complement: this.serviceOrderForm.get('complement')!.value ?? "",
        neighborhood: this.serviceOrderForm.get('neighborhood')!.value ?? "",
        city: this.serviceOrderForm.get('city')!.value ?? "",
        state: this.serviceOrderForm.get('state')!.value ?? ""
      }
    }

    this.serviceOrderService.createServiceOrder(this.serviceOrder).subscribe({
      next: _ => {
        this.serviceOrderForm.reset();
        this.serviceOrderService.triggerUpdate();
        this.router.navigate(["ordensDeServico"])
      },
      error: err => console.log(err)
    })
  }
}
