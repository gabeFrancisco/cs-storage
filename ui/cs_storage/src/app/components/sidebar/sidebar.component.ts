import { Component } from '@angular/core';
import { faCartShopping, faChartLine, faTags, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

interface SidebarItem {
  id: number;
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
      id: 0,
      icon: faChartLine,
      text: "Painel",
      url: "/"
    },
    {
      id: 1,
      icon: this.faCategory,
      text: "Categorias",
      url: "categorias"
    },
    {
      id: 2,
      icon: this.faProduct,
      text: "Produtos",
      url: "produtos"
    }
  ]

  user: any = null;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!).user
  }
}
