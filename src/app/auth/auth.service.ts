import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {map, Observable, of, throwError} from "rxjs";
import { catchError } from 'rxjs/operators';
import {Router} from "@angular/router";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth_array: any[] = [];
  loginFailed: boolean = false;

  constructor(private http:HttpClient, private router: Router) {
  }



  getFollowerInfo(name: string) {
    for (const obj of this.auth_array) {
      if(name == obj.name) {
        return {
          name: name,
          headLine:obj.headLine,
          imgSrc: "../../assets/little_penguin.jpeg",
          id: obj.id
        }
      }
    }
    return null
  }

  isValidUsername(userName: string) {
    for (const obj of this.auth_array) {
      if(userName == obj.userName) {
        return false
      }
    }
    return true
  }


  login(userName: string, password: string):Observable<any> {
    return this.http.post("https://tc78-ricebookserver-final.herokuapp.com/login", {username: userName, password: password},
        {withCredentials: true}
    )
  }




  logout() {
    this.http.put("https://tc78-ricebookserver-final.herokuapp.com/logout", {}, {withCredentials: true, responseType: "text"}).subscribe(response => {
      localStorage.setItem("isLogged", "false")
      localStorage.setItem("userName", "")
      this.router.navigate(['/login'])
    })
  }

  isLoggedIn():boolean {
    if (localStorage.getItem("isLogged") == "true") {
      return true
    }
    return false
  }
}
