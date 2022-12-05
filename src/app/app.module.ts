import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { MainComponent } from './main/main.component';
import { RegistrationComponent } from './auth/registration/registration.component';
import { DifferentPasswordDirective } from './shared/different-password.directive';
import { ForbiddenAgeDirective } from './shared/forbidden-age.directive';
import { PostsComponent } from './main/posts/posts.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import { ProfileComponent } from './profile/profile.component';
import { CommentsComponent } from './main/posts/comments/comments.component';
import {MatPaginatorModule} from '@angular/material/paginator'

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    MainComponent,
    RegistrationComponent,
    DifferentPasswordDirective,
    ForbiddenAgeDirective,
    PostsComponent,
    ProfileComponent,
    CommentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
