import { Component } from '@angular/core';
import { faCartShopping, faChartLine, faTags, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

interface SidebarItem {
  icon: IconDefinition,
  iconColor: string,
  text: string,
  url: string
}

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  //Icons
  faChartLine = faChartLine;
  faBoxOpen = faBoxOpen;
  faWrench = faWrench;
  faFile = faFileInvoiceDollar
  faProduct = faCartShopping
  faCategory = faTags

  items: SidebarItem[] = [
    {
      icon: this.faChartLine,
      iconColor: "text-blue-400",
      text: "Painel",
      url: "/"
    },
    {
      icon: this.faCategory,
      iconColor: "text-orange-400",
      text: "Categorias",
      url: "categorias"
    },
    {
      icon: this.faProduct,
      iconColor: "text-indigo-400",
      text: "Produtos",
      url: "produtos"
    },
    {
      icon: this.faBoxOpen,
      iconColor: "text-amber-400",
      text: "Produtos em Falta",
      url: "produtosEmFalta"
    },
    {
      icon: this.faWrench,
      iconColor: "text-green-400",
      text: "Ordens de Serviço",
      url: "ordensDeServico"
    },
    {
      icon: this.faFile,
      iconColor: "text-purple-400",
      text: "Orçamentos",
      url: "orcamentos"
    },
  ]

  user: any = null;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!).user
  }
}
