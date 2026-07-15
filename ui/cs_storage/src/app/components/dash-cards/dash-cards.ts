import { Component, OnInit } from '@angular/core';
import { faCashRegister, faDollarSign, faShoppingBasket, faWrench, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CashRegisterService } from '../../services/cash-register.service';

interface CardItem {
  icon: IconDefinition,
  name: string
  data?: number
  class: string
  isCash: boolean,
  isFixed: boolean
}

@Component({
  selector: 'app-dash-cards',
  standalone: false,
  templateUrl: './dash-cards.html',
  styleUrl: './dash-cards.css',
})

export class DashCards implements OnInit {
  constructor(private cashRegisterService: CashRegisterService) { }

  ngOnInit(): void {
    this.cashRegisterService.triggerUpdate();
    this.cashRegisterService.refreshList$.subscribe(() => {
      this.fetchData()
    })
  }

  private fetchData() {
    this.cashRegisterService.getDayAndMonthValueData()
      .subscribe((res) => this.items[0].data = res.day)
  }

  faDollar = faDollarSign
  faDebts = faCashRegister
  faProducts = faShoppingBasket
  faWrench = faWrench

  items: CardItem[] = [
    {
      icon: this.faDollar,
      name: "Caixa de Hoje",
      data: 0,
      class: "bg-emerald-500 shadow-md shadow-emerald-300",
      isCash: true,
      isFixed: true
    },
    {
      icon: this.faDebts,
      name: "Débitos do Mês",
      data: 712,
      class: "bg-blue-500 shadow-md shadow-blue-300",
      isCash: true,
      isFixed: true
    },
    {
      icon: this.faProducts,
      name: "Produtos faltantes",
      data: 3,
      class: "bg-orange-400 shadow-md shadow-orange-300",
      isCash: false,
      isFixed: false
    },
    {
      icon: this.faWrench,
      name: "O.S. Ativas",
      data: 2,
      class: "bg-indigo-500 shadow-md shadow-indigo-300",
      isCash: false,
      isFixed: false
    }
  ]
}
