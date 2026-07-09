import { Component } from '@angular/core';
import { faCartShopping, faChartLine, faTags, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

interface SidebarItem {
  icon: IconDefinition,
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
      text: "Painel",
      url: "/"
    },
    {
      icon: this.faCategory,
      text: "Categorias",
      url: "categorias"
    },
    {
      icon: this.faProduct,
      text: "Produtos",
      url: "produtos"
    },
    {
      icon: this.faBoxOpen,
      text: "Produtos em Falta",
      url: "produtosEmFalta"
    },
    {
      icon: this.faWrench,
      text: "Ordens de Serviço",
      url: "ordensDeServico"
    },
    {
      icon: this.faFile,
      text: "Orçamentos",
      url: "orcamentos"
    },
  ]

  user: any = null;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!).user
  }
}
