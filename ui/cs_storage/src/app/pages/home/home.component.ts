import { UserService } from './../../services/user.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private userService: UserService){
    userService.login({
      email: "gabrielsfrancisco508@gmail.com",
      password: "gabe1234"
    }).subscribe()
   }
}
