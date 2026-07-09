import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceOrder } from '../../../models/ServiceOrder';
import { ServiceOrderService } from '../../services/service-order.service';
import { FormMode } from '../../../models/types/FormMode';
import { combineLatest, filter, Subject, switchMap, takeUntil } from 'rxjs';

@Component({
  selector: 'app-service-order-create',
  standalone: false,
  templateUrl: './service-order-create.component.html',
  styleUrl: './service-order-create.component.css'
})
export class ServiceOrderCreateComponent implements OnInit, OnDestroy {

  serviceOrder!: ServiceOrder;

  mode: FormMode = 'read';

  get readonOnly() {
    return this.mode === 'read'
  }

  private destroy$ = new Subject<void>();

  serviceOrderForm = new FormGroup({
    hasAddress: new FormControl(false),
    title: new FormControl("", Validators.required),
    description: new FormControl("", Validators.required),
    priority: new FormControl(1, Validators.required),
    service_date: new FormControl("", Validators.required),
    value: new FormControl(0),
    customer: new FormGroup({
      name: new FormControl("", Validators.required),
      phone: new FormControl("", Validators.required),
    }),
    road: new FormControl(""),
    number: new FormControl(""),
    complement: new FormControl(""),
    neighborhood: new FormControl(""),
    city: new FormControl(""),
    state: new FormControl("")
  })

  constructor(private serviceOrderService: ServiceOrderService, private router: Router) { }

  ngOnInit(): void {
    this.serviceOrderService.formMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(value => { alert(this.mode), this.mode = value as FormMode })

    const route = this.router.url.split('/').pop();

    if (route === 'novo') {
      this.mode = 'create'
    }

    combineLatest([
      this.serviceOrderService.serviceOrderId$,
      this.serviceOrderService.formMode$
    ])
      .pipe(
        takeUntil(this.destroy$),
        filter(([id, mode]) => !!id && mode !== 'create'),
        switchMap(([id]) => this.serviceOrderService.getCachedServiceOrderById(id!))
      )
      .subscribe(order => {
        if (order) this.serviceOrderForm.patchValue(order!)
      })

    this.serviceOrderService.formMode$
      .pipe(
        takeUntil(this.destroy$),
        filter(mode => mode === 'create')
      )
      .subscribe(() => this.resetForm())
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  cancel() {
    this.router.navigate(["ordensDeServico"])
  }

  submit() {
    if (this.mode === 'read') {
      this.serviceOrderService.setFormMode('update');
      return;
    }

    if (this.serviceOrderForm.invalid) {
      return;
    }

    const serviceOrder = this.serviceOrderForm.value as ServiceOrder;
    const request$ =
      this.mode === 'create'
        ? this.serviceOrderService.createServiceOrder({ ...serviceOrder, id: undefined })
        : this.serviceOrderService.updateServiceOrder(serviceOrder);

    request$.pipe(takeUntil(this.destroy$)).subscribe({
      next: () => this.onSuccess
    })
  }

  private resetForm() {
    this.serviceOrderForm.reset({
      hasAddress: false,
      title: "",
      description: "",
      priority: 0,
      service_date: "",
      value: 0,
      customer: { name: "", phone: "" },
      road: "",
      number: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: ""
    })
  }

  private onSuccess() {
    this.resetForm();
    this.serviceOrderService.triggerUpdate();
    this.router.navigate(["ordensDeServico"])

  }
}
