import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {forbiddenAgeValidator} from "../shared/forbidden-age.directive";
import {differentPasswordValidator} from "../shared/different-password.directive";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {Post} from "../main/posts/post";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  userNameStr: string = localStorage.getItem("userName")!;
  emailStr: string = "7777@rice.edu";
  dobStr: Date = new Date();
  zipcodeStr: string = "90210";
  passwordStr: string = "******";
  invalidForm: boolean = false;
  validationMessage: any[] = [];
  avatar: string = "";
  fileInput: File | null = null;
  showDob: boolean = true;
  showAccountLinking: boolean = false;
  loginFailedStr: string = "";
  loginForm = new FormGroup({
    userName: new FormControl(''),
    password: new FormControl(''),
  });
  loginFailed: boolean = false;
  linkWord: string = "Link";
  linkOption: string = "";


  profileForm = new FormGroup({
    password: new FormControl(''),
    passwordConfirm: new FormControl(''),
    email: new FormControl(''),
    zipcode: new FormControl(''),
  }, {validators: differentPasswordValidator});

  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.getEmail();
    this.getZipcode();
    this.getDob();
    this.getAvatar();
    this.getOauth();
  }

  showProfileOrLink() {
    this.showAccountLinking = !this.showAccountLinking;
    if (this.showAccountLinking) {
      this.linkWord = "Change profile"
    } else {
        this.linkWord = "Link"
    }
  }

  unlink(){
    this.http.put(`https://tc78-ricebookserver-final.herokuapp.com/unlink`, {},{withCredentials: true}).subscribe(
        (response: any) => {
          this.linkOption = ""
        }
    )
  }

  getOauth() {
    this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/oauth`, {withCredentials: true}).subscribe(
        (response: any) => {
          if (response["oauth"]) {
            if(response['oauthUsername']){
              this.linkOption = "unlink";
              this.showAccountLinking = false;
            }
            else{
              this.linkOption = "link";
            }
          }
        }
    )
  }

  linkAccount() {
    this.http.post(`https://tc78-ricebookserver-final.herokuapp.com/link`, {username: this.loginForm.get("userName")!.value!, password: this.loginForm.get("password")!.value!},{withCredentials: true})
    .subscribe({
      next: (response: any) => {
        this.loginFailed = false
        localStorage.setItem("isLogged", "true")
        localStorage.setItem("userName", response['username'])
        this.userNameStr = response['username']
        this.getEmail();
        this.getZipcode();
        this.getDob();
        this.getAvatar();
        this.getOauth();
      }, error: error => {
        this.loginFailed = true;
        if(error['status'] == 409){
          this.loginFailedStr = "The user already linked";
        }
        else if(error['status'] == 401) {
          this.loginFailedStr = "Bad username or password"
        }
      }
    })
  }


  updateEmail(){
    this.http.put(`https://tc78-ricebookserver-final.herokuapp.com/email`,{email: this.email.value}, {withCredentials: true,}
    ).subscribe( (response:any) => {

    })
  }

  updateZipcode(){
    this.http.put(`https://tc78-ricebookserver-final.herokuapp.com/zipcode`,{zipcode: this.zipcode.value}, {withCredentials: true,}
    ).subscribe( (response:any) => {

    })
  }

  updatePassword(){
    this.http.put(`https://tc78-ricebookserver-final.herokuapp.com/password`,{password: this.password.value}, {withCredentials: true,}
    ).subscribe( (response:any) => {

    })
  }

  getEmail(){
    this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/email`, {withCredentials: true}).subscribe(
        (response:any) => {
          this.emailStr = response["email"]
        }
    )
  }

  getZipcode(){
    this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/zipcode`, {withCredentials: true}).subscribe(
        (response:any) => {
          this.zipcodeStr = response["zipcode"]
        }
    )
  }

  getDob(){
    this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/dob`, {withCredentials: true}).subscribe(
        (response:any) => {
          if(response["dob"]){
            this.dobStr = new Date(response["dob"])
            this.showDob = true;
          }
          else{
            this.showDob = false;
          }

        }
    )
  }

  getAvatar() {
    this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/avatar`, {withCredentials: true}).subscribe(
        (response:any) => {
          this.avatar = response["avatar"]
        }
    )
  }

  onFileSelected(event: any){
    this.fileInput = event.target.files[0]!;
  }

  uploadAvatar(){
    if(this.fileInput) {
      let fd = new FormData();
      fd.append("image", this.fileInput!)

      this.http.put(`https://tc78-ricebookserver-final.herokuapp.com/avatar`,fd, {withCredentials: true,}
      ).subscribe( (response:any) => {
        this.avatar = response["avatar"]
      })
    }
  }


  onSubmit(){
    if (this.profileForm.valid) {
      this.passwordStr = "*".repeat(this.password.value.length);
      this.zipcodeStr = this.zipcode.value;
      this.emailStr = this.email.value;

      this.updateEmail();
      this.updateZipcode();
      this.updatePassword();

      this.profileForm.reset()
      this.invalidForm = false;
    }
    else {
      this.invalidForm = true;
      this.validationMessage = []

      if(this.email.errors?.['required']) {
        this.validationMessage.push("Email is required.")
      }
      else if(this.email.errors?.['email']) {
        this.validationMessage.push("Email should include @.")
      }

      /*
      if(this.phoneNumber.errors?.['required']) {
        this.validationMessage.push("Phone number is required.")
      }
      else if(this.phoneNumber.errors?.['pattern']) {
        this.validationMessage.push("Phone number expect proper format of 123-123-1234")
      }*/

      if(this.zipcode.errors?.['required']) {
        this.validationMessage.push("Zipcode is required.")
      }
      else if(this.zipcode.errors?.['pattern']) {
        this.validationMessage.push("Zipcode expect 5 digit number")
      }

      if(this.password.errors?.['required']) {
        this.validationMessage.push("Password is required.")
      }

      if(this.passwordConfirm.errors?.['required']) {
        this.validationMessage.push("Password confirm is required.")
      }

      if(this.profileForm.errors?.['differentPassword']) {
        this.validationMessage.push("Password should be same.")
      }

    }
  }

  get password() { return this.profileForm.get("password") as FormControl; }
  get passwordConfirm() { return this.profileForm.get("passwordConfirm") as FormControl; }
  get email() { return this.profileForm.get("email") as FormControl; }
  get zipcode() { return this.profileForm.get("zipcode") as FormControl; }

  get loginUserName() { return this.loginForm.get("userName") as FormControl; }
  get loginPassword() { return this.loginForm.get("password") as FormControl; }

}
