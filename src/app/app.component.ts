import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Ricebook';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  isLoggedIn():boolean {
    if (localStorage.getItem("isLogged") == "true"){
      return true
    }
    return false
  }
}
