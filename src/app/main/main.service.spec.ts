import { TestBed } from '@angular/core/testing';

import { MainService } from './main.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormsModule} from "@angular/forms";

describe('MainService', () => {
  let service: MainService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(MainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get users followers', () => {
    let users = [
      {
        name: "tim",
        id: 0,
        headLine: "777"
      },
      {
        name: "tim1",
        id: 1,
        headLine: "777"
      },
      {
        name: "tim2",
        id: 2,
        headLine: "777"
      },
      {
        name: "tim3",
        id: 3,
        headLine: "777"
      }
    ]
    /*
    let followers = service.getUserFollowers(users)
    expect(followers.length).toEqual(3)
    expect(service).toBeTruthy();*/
  });
});
