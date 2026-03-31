import { Component } from '@angular/core';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { faFileInvoiceDollar } from '@fortawesome/free-solid-svg-icons';

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

  user: any = null;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!).user
  }
}
