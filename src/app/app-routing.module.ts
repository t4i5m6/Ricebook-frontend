import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LoginGuard} from "./login-guard.guard";
import {ProfileComponent} from "./profile/profile.component";
import {AuthComponent} from "./auth/auth.component";
import {MainGuard} from "./main-guard.guard";

const routes: Routes = [
  { path: '', component: MainComponent , canActivate: [LoginGuard]},
  { path: 'login', component: AuthComponent, canActivate: [MainGuard]},
  { path: 'profile', component: ProfileComponent , canActivate: [LoginGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
