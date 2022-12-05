import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";
import {PostsComponent} from "./posts/posts.component";
import {Router} from "@angular/router";
import {AuthService} from "../auth/auth.service";

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  const authServiceSpy =
      jasmine.createSpyObj('AuthService', ['getFollowerInfo']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainComponent, PostsComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      providers:[{provide: AuthService, useValue: authServiceSpy}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update headline', () => {
    component.headLineInput = "777777"
    component.onClickHeadline()

    expect(component.headLine).toEqual("777777")
    localStorage.clear()
  });

  it('should add follower with error message', () => {
    component.onClickAdd()

    expect(component.addFollowerErrorMessage).toEqual("Please type a follower name!")

    component.followerInput = "tim"
    localStorage.setItem("name", "tim")
    component.onClickAdd()
    expect(component.addFollowerErrorMessage).toEqual("Cannot follower yourself")
    localStorage.clear()

    component.followers = [{name: "tim"}]
    component.followerInput = "tim"
    component.onClickAdd()
    expect(component.addFollowerErrorMessage).toEqual("The follower already exists")

    component.followers = []
    component.followerInput = "tim"
    authServiceSpy.getFollowerInfo.and.returnValue(null);
    component.onClickAdd()
    expect(authServiceSpy.getFollowerInfo).toHaveBeenCalled()
    expect(component.addFollowerErrorMessage).toEqual("The follower does not exists")

    component.followerInput = "tim"
    authServiceSpy.getFollowerInfo.and.returnValue({name:"tim", id: 0});
    component.onClickAdd()
    expect(component.addFollowerErrorMessage).toEqual("")
    expect(component.followers).toEqual([{name:"tim", id: 0}])

    component.onClickDelete("123")
    component.textArea = "123"
    component.onClickTextArea()
    component.clearTextArea()
  });
});
