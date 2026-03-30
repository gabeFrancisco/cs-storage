import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  user: any = null;
  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!).user
  }
}
