import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });

  loginFailed: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.login(this.loginForm.get("userName")!.value!, this.loginForm.get("password")!.value!
    ).subscribe({
      next: response => {
        this.loginFailed = false
        localStorage.setItem("isLogged", "true")
        localStorage.setItem("userName", response['username'])
        this.router.navigate([''])
    }, error: error => {
        this.loginFailed = true
        this.loginForm.reset()
      }})
  }

  get userName() { return this.loginForm.get("userName") as FormControl; }
  get password() { return this.loginForm.get("password") as FormControl; }
}
