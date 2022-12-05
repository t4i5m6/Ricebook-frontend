import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {Router} from "@angular/router";

describe('AuthService', () => {
  let service: AuthService;
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [{provide: Router, useValue: routerSpy}]
        }
    );
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it("should log in a previously registered user", ()=> {
    const spy = routerSpy.navigate as jasmine.Spy;
    //const navArgs = spy.calls.first().args[0];
    service.auth_array = [{
      userName: "tim",
      name: "tim",
      password: "12345",
      headLine: "headline",
      id: 0
    }]
    service.login("tim", "12345")
    expect(localStorage.getItem("isLogged")).toBeTruthy()
    localStorage.clear()
  });

  it("should not log in a invalid user", ()=> {
    const spy = routerSpy.navigate as jasmine.Spy;
    //const navArgs = spy.calls.first().args[0];
    service.auth_array = [{
      userName: "tim",
      name: "tim",
      password: "12345",
      headLine: "headline",
      id: 0
    }]
    service.login("BadGuy", "12345")
    expect(localStorage.getItem("isLogged")).toBeNull()
    expect(service.loginFailed).toBeTruthy()
  })

  it("should log out a user", ()=> {
    const spy = routerSpy.navigate as jasmine.Spy;
    service.auth_array = [{
      userName: "tim",
      name: "tim",
      password: "12345",
      headLine: "headline",
      id: 0
    }]
    service.login("tim", "12345")
    service.logout()
    const navArgs = spy.calls.first().args[0];
    expect(localStorage.getItem("isLogged")).toEqual("false")
    expect(navArgs).toEqual(['/login'])
    localStorage.clear()
  })

  it("should not get follower user", ()=> {
    service.isValidUsername("tim")
    service.isLoggedIn()
    let follower = service.getFollowerInfo("tim")
    expect(follower).toBeNull()
  });
});
