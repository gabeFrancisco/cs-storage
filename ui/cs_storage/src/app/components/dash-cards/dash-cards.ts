import { Component } from '@angular/core';
import { faCashRegister, faDollarSign, IconDefinition } from '@fortawesome/free-solid-svg-icons';

interface CardItem {
  icon: IconDefinition,
  name: string
  data?: number
  class: string
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

  items: CardItem[] = [
    {
      icon: this.faCategory,
      name: "Caixa de Hoje",
      data: 312,
      class: "bg-emerald-500"
    },
    {
      icon: this.faDebts,
      name: "Débitos do Mês",
      data: 712,
      class: "bg-blue-500"
    }
  ]
}
