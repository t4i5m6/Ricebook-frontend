import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MainService {


  constructor(private http:HttpClient) { }

  getHeadline() {
    let userName = localStorage.getItem("userName")
    return this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/headline/${userName}`, {withCredentials: true})
  }

}


