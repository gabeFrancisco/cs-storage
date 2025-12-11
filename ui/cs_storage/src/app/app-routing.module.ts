import { UserComponent } from './pages/user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MissingProductsComponent } from './pages/missing-products/missing-products.component';
import { ServiceOrdersComponent } from './pages/service-orders/service-orders.component';
import { ServiceOrderCreateComponent } from './pages/service-order-create/service-order-create.component';
import { ServiceOrderUpdateComponent } from './pages/service-order-update/service-order-update.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EstimatesComponent } from './pages/estimates/estimates.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    children: [
      {
        path: "",
        component: DashboardComponent
      },
      {
        path: "produtosEmFalta",
        component: MissingProductsComponent
      },
      {
        path: "ordensDeServico",
        component: ServiceOrdersComponent,
      },
      {
        path: "ordensDeServico/novo",
        component: ServiceOrderCreateComponent
      },
      {
        path: "ordensDeServico/editar",
        component: ServiceOrderUpdateComponent
      },
      {
        path: "orcamentos",
        component: EstimatesComponent
      },
      {
        path: "usuario",
        component: UserComponent
      },
    ]
  },
  {
    path: "login",
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
