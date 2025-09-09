import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user',
  standalone: false,
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  user: any = null;

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("user")!).user
  }
}
