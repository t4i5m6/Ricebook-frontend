import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {differentPasswordValidator} from "../../shared/different-password.directive";
import {forbiddenAgeValidator} from "../../shared/forbidden-age.directive";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  registerForm = new FormGroup({
    userName: new FormControl('', [ Validators.required,]),
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    displayName: new FormControl(''),
    email: new FormControl(''),
    phoneNumber: new FormControl(''),
    dateOfBirth: new FormControl('', [Validators.required, forbiddenAgeValidator()]),
    zipcode: new FormControl(''),
  }, {validators: differentPasswordValidator});
  constructor(private router: Router, private http:HttpClient) { }

  registerFailed: boolean = false;

  ngOnInit(): void {
  }

  onSubmit(){
    this.http.post("https://tc78-ricebookserver-final.herokuapp.com/register", {
      username: this.registerForm.get("userName")?.value!, password: this.registerForm.get("password")?.value!,
      email: this.registerForm.get("email")?.value!, zipcode: this.registerForm.get("zipcode")?.value!,
      dob: this.registerForm.get("dateOfBirth")?.value!
        },
        {withCredentials: true}
    ).subscribe(
      {
        next: response => {
          this.http.post("https://tc78-ricebookserver-final.herokuapp.com/login", {
            username: this.registerForm.get("userName")?.value!, password: this.registerForm.get("password")?.value!
              },
              {withCredentials: true}
          ).subscribe(response => {
            localStorage.setItem("isLogged", "true")
            localStorage.setItem("userName", this.registerForm.get("userName")?.value!)
            this.router.navigate([''])
          })
        }, error: error => {
          this.registerFailed = true
      }}
    )

  }


  get userName() { return this.registerForm.get("userName") as FormControl; }
  get password() { return this.registerForm.get("password") as FormControl; }
  get displayName() { return this.registerForm.get("displayName") as FormControl; }
  get passwordConfirm() { return this.registerForm.get("passwordConfirm") as FormControl; }
  get email() { return this.registerForm.get("email") as FormControl; }
  get phoneNumber() { return this.registerForm.get("phoneNumber") as FormControl; }
  get dateOfBirth() { return this.registerForm.get("dateOfBirth") as FormControl; }
  get zipcode() { return this.registerForm.get("zipcode") as FormControl; }

  isNumber(s: string): boolean {
    return !isNaN(Number(s));
  }


}
