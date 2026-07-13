import { Component } from '@angular/core';
import { faCashRegister, faDollarSign, faShoppingBasket, faWrench, IconDefinition } from '@fortawesome/free-solid-svg-icons';

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

export class DashCards {
  faCategory = faDollarSign
  faDebts = faCashRegister
  faProducts = faShoppingBasket
  faWrench = faWrench

  items: CardItem[] = [
    {
      icon: this.faCategory,
      name: "Caixa de Hoje",
      data: 312,
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
