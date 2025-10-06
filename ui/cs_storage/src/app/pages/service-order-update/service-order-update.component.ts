import { ServiceOrder } from './../../../models/ServiceOrder';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceOrderService } from '../../services/service-order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-service-order-update',
  standalone: false,
  templateUrl: './service-order-update.component.html',
  styleUrl: './service-order-update.component.css'
})
export class ServiceOrderUpdateComponent implements OnInit {

  serviceOrderForm!: FormGroup;
  edit: boolean = false;

  serviceOrder!: ServiceOrder;

  constructor(
    private serviceOrderService: ServiceOrderService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.serviceOrderService.edit$.subscribe(value => {
      this.edit = value
      if(value){
        this.serviceOrderForm.enable()
      }
      else{
        this.serviceOrderForm.disable();
      }
    })
    this.serviceOrderForm = new FormGroup({
      hasAddress: new FormControl(false),
      id: new FormControl(0),
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
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.serviceOrderService.getCachedServiceOrderById(parseInt(params.get('id')!))?.subscribe(value => {
        // const ServiceOrder: ServiceOrder = {
        //   id: value!.id,
        //   title: value!.title,
        //   description: value!.description,
        //   priority: value!.priority,
        //   service_date: value!.service_date,
        //   customer: {
        //     name: value!.customer.name,
        //     phone: value!.customer.phone
        //   }
        // }
        if (value!.address) {
          this.serviceOrderForm.controls['hasAddress'].setValue(true)
        }
        this.serviceOrderForm.patchValue({
          id: value!.id,
          title: value!.title,
          description: value!.description,
          priority: value!.priority,
          service_date: value!.service_date,
          value: value!.value,
          customer_name: value!.customer.name,
          customer_phone: value!.customer.phone,
          road: value!.address?.road,
          number: value!.address?.number,
          complement: value!.address?.complement,
          neighborhood: value!.address?.neighborhood,
          city: value!.address?.city,
          state: value!.address?.state
        })
      })
    })
  }

  cancel(){
    this.serviceOrderService.setEdit(false);
    alert(this.edit)
  }

  back() {
    this.router.navigate(["ordensDeServico"])
  }

  submit() {
    if(!this.edit){
      this.edit = true
      return;
    }

    if (this.serviceOrderForm.invalid) {
      return;
    }
    this.serviceOrder = {
      id: this.serviceOrderForm.get('id')!.value,
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

    this.serviceOrderService.updateServiceOrder(this.serviceOrder).subscribe({
      next: _ => {
        this.serviceOrderForm.reset();
        this.serviceOrderService.triggerUpdate();
        this.router.navigate(["ordensDeServico"])
      },
      error: err => console.log(err)
    })
  }
}
