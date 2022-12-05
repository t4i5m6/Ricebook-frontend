import { TestBed } from '@angular/core/testing';

import { PostsService } from './posts.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpClient} from "@angular/common/http";
import {of} from "rxjs";
import {Post} from "./post";

describe('PostsService', () => {
  let service: PostsService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(PostsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all articles for current logged in user', () => {
    const users =
      [
        {
          "id": 0,
          "name": "tim0",
        },
        {
          "id": 1,
          "name": "tim1",
        },
        {
          "id": 2,
          "name": "tim2",
        },
        {
          "id": 3,
          "name": "tim3",
        }
    ]

    const posts = [
      {
        "userId": 0,
        "body": "I am body"
      },
      {
        "userId": 1,
        "body": "I am body1"
      },
      {
        "userId": 2,
        "body": "I am body2"
      },
      {
        "userId": 3,
        "body": "I am body3"
      },
    ]
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2022, 7, 7));
    localStorage.setItem("id", "0")
    service.getUserPosts(posts, users)
    expect(service.posts).toEqual([new Post(
        "tim0",
        "I am body",
        1659848400000,
        "../../assets/common-bottlenose-dolphin.jpeg",
    ), new Post(
        "tim1",
        "I am body1",
        1659848400000,
        "../../assets/Emperor-penguin2.png",
    ), new Post(
        "tim2",
        "I am body2",
        1659848400000,
        "../../assets/Killerwhales_jumping.jpeg",
    ), new Post(
        "tim3",
        "I am body3",
        1659848400000,
        "",
    )])
    localStorage.clear()
    jasmine.clock().uninstall();
  });
  it('should fetch subset of articles for current logged in user given search keyword', () => {
    service.allPosts = [
      new Post(
          "tim0",
          "I am body",
          1659848400000,
          "../../assets/common-bottlenose-dolphin.jpeg",
      ), new Post(
          "tim1",
          "I am body1",
          1659848400000,
          "../../assets/Emperor-penguin2.png",
      )
    ]

    service.posts = [
      new Post(
          "tim0",
          "I am body",
          1659848400000,
          "../../assets/common-bottlenose-dolphin.jpeg",
      ), new Post(
          "tim1",
          "I am body1",
          1659848400000,
          "../../assets/Emperor-penguin2.png",
      )
    ]

    service.search("tim0", "")
    expect(service.posts).toEqual([new Post(
        "tim0",
        "I am body",
        1659848400000,
        "../../assets/common-bottlenose-dolphin.jpeg",
    )])

    service.search("", "body1")
    expect(service.posts).toEqual([new Post(
        "tim1",
        "I am body1",
        1659848400000,
        "../../assets/Emperor-penguin2.png",
    )])
  });

  it('should add articles when adding a follower', () => {
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date(2022, 7, 7));
    service.allUserPosts = [
      {
        userId: 0,
        text: "I am body"
      },
      {
        userId: 1,
        text: "I am body1"
      },
      {
        userId: 2,
        text: "I am body2"
      },
      {
        userId: 2,
        text: "I am body2"
      }
    ]
    service.allPosts = [
      new Post(
          "tim0",
          "I am body",
          1659848400000,
          "../../assets/common-bottlenose-dolphin.jpeg",
      ), new Post(
          "tim1",
          "I am body1",
          1659848400000,
          "../../assets/Emperor-penguin2.png",
      )
    ]

    service.posts = [
      new Post(
          "tim0",
          "I am body",
          1659848400000,
          "../../assets/common-bottlenose-dolphin.jpeg",
      ), new Post(
          "tim1",
          "I am body1",
          1659848400000,
          "../../assets/Emperor-penguin2.png",
      )
    ]


    let originalLength = service.posts.length
    service.addFollowerPosts(2, "Jones")
    expect(service.posts.length).toBeGreaterThan(originalLength)
    jasmine.clock().uninstall();
  });

  it('should remove articles when removing a follower', () => {
    service.allPosts = [
      new Post(
          "tim0",
          "I am body",
          1659848400000,
          "../../assets/common-bottlenose-dolphin.jpeg",
      ), new Post(
          "tim1",
          "I am body1",
          1659848400000,
          "../../assets/Emperor-penguin2.png",
      )
    ]

    service.posts = [
      new Post(
          "tim0",
          "I am body",
          1659848400000,
          "../../assets/common-bottlenose-dolphin.jpeg",
      ), new Post(
          "tim1",
          "I am body1",
          1659848400000,
          "../../assets/Emperor-penguin2.png",
      )
    ]

    let originalLength = service.posts.length
    service.deleteFollowerPosts("tim0")
    expect(service.posts.length).toBeLessThan(originalLength)
  });
});
