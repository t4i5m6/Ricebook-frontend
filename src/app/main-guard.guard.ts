import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "./auth/auth.service";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MainGuard implements CanActivate {
  constructor(private http: HttpClient, private authServ: AuthService, private router: Router) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(this.authServ.isLoggedIn()) {
      this.router.navigate([''])
    }
    else{
      this.http.get("https://tc78-ricebookserver-final.herokuapp.com/islogged", {withCredentials: true}).subscribe({
        next: (response:any) => {
          localStorage.setItem("isLogged", "true")
          localStorage.setItem("userName", response['username'])
          this.router.navigate([''])
        }, error: error => {
          localStorage.setItem("isLogged", "false")
          localStorage.setItem("userName", "")
        }})
    }

    return true;
  }

}
