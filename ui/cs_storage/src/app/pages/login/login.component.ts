import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup

  constructor(private userService: UserService) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required])
    })
  }

  submit() {
    if (!this.loginForm.valid){
      return;
    }

    this.userService.login({
      email: this.loginForm.get('email')!.value,
      password: this.loginForm.get('password')!.value
    }).subscribe(({
      next: (data) => {
        localStorage.setItem("user", JSON.stringify(data));
        window.location.href = ""
      },
      error: () => alert("Usuário ou senha inválidos!")
    }))
  }
}
