import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PostsService} from "./posts.service";
import {Post} from "./post";
import {forkJoin} from "rxjs";
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {

  name: string = localStorage.getItem("userName")!
  posts: Post[] = [];

  constructor(public postServ: PostsService, private http:HttpClient) { }

  ngOnInit(): void {
    this.postServ.getPosts()
  }

  edit(post: Post) {
    if(this.name == post.author){
      post.textArea = post.text
      post.editing = true
    }
  }

  confirmEdit(post: Post){
    this.http.put(`https://tc78-ricebookserver-final.herokuapp.com/articles/${post.id}`,{text: post.textArea}, {withCredentials: true}
    ).subscribe( (response:any) => {
      post.text = post.textArea
      post.editing = false
    })
  }

  cancelEdit(post: Post){
    post.editing = false
  }

  onClickComment(post: Post) {
    post.showComment = !post.showComment
  }


}
