import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MissingProductsComponent } from './pages/missing-products/missing-products.component';
import { ServiceOrdersComponent } from './pages/service-orders/service-orders.component';
import { ServiceOrderCreateComponent } from './pages/service-order-create/service-order-create.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "produtosEmFalta",
    component: MissingProductsComponent
  },
  {
    path: "ordensDeServiço",
    component: ServiceOrdersComponent,
  },
  {
    path: "ordensDeServiço/novo",
    component: ServiceOrderCreateComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
