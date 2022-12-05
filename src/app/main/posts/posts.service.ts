import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Post} from "./post";
import {PageEvent} from "@angular/material/paginator";
import {Comment} from "./comments/comment";

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[] = [];
  pagedList: Post[] = [];
  length: number = 0;
  pageSize: number = 10;

  img_srcs = ['../../assets/common-bottlenose-dolphin.jpeg', '../../assets/Emperor-penguin2.png', '../../assets/Killerwhales_jumping.jpeg']
  constructor(private http:HttpClient) {

  }

  OnPageChange(event: PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
        endIndex = this.length;
    }
    this.pagedList = this.posts.slice(startIndex, endIndex);
  }

  setPagedList(){
      this.length = this.posts.length
      this.pagedList = this.posts.slice(0, Math.min(this.pageSize, this.length));
  }

  getPosts() {

    this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/articles`, {withCredentials: true}).subscribe(
        (response:any) => {
          this.posts = [];
          for (let i = 0; i < response['articles'].length; i++) {
            let cur = response['articles'][i];
            let p = new Post(cur["pid"], cur["author"], cur["text"], new Date(cur["date"]), cur["picture"]);
              for (let j = 0; j < cur["comments"].length; j++){
                  let curComment = cur["comments"][j]
                  p.comments.push(new Comment(curComment["commentId"], curComment["comment"], curComment["author"]))
              }
            this.posts.push(p);
          }
          this.setPagedList()
        })
  }

  deleteFollowerPosts(author: string) {
    this.posts = this.posts.filter(p => p.author != author);
    this.setPagedList();
  }

  addFollowerPosts(author: string) {
    this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/articles/${author}`, {withCredentials: true}).subscribe(
        (response:any) => {
            for (let i = 0; i < response['articles'].length; i++) {
                let cur = response['articles'][i];
                let p = new Post(cur["pid"], cur["author"], cur["text"], new Date(cur["date"]), cur["picture"]);
                for (let j = 0; j < cur["comments"].length; j++){
                    let curComment = cur["comments"][j]
                    p.comments.push(new Comment(curComment["commentId"], curComment["comment"], curComment["author"]))
                }
                this.posts.push(p);
            }
            this.posts.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime());
            this.setPagedList();
        })
  }

  search(author:string, text:string) {
      this.posts = []
      this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/articles`, {withCredentials: true}).subscribe(
          (response:any) => {
              for (let i = 0; i < response['articles'].length; i++) {
                  let cur = response['articles'][i];
                  let p = new Post(cur["pid"], cur["author"], cur["text"], new Date(cur["date"]), cur["picture"]);
                  for (let j = 0; j < cur["comments"].length; j++){
                      let curComment = cur["comments"][j]
                      p.comments.push(new Comment(curComment["commentId"], curComment["comment"], curComment["author"]))
                  }
                  this.posts.push(p);
              }
               if(author || text) {
                   this.posts = this.posts.filter(p => (author == "" || p.author.includes(author)) && (text == "" || p.text.includes(text))).sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime())
               }
               else if(!author && !text) {
                   this.posts = this.posts.sort((a,b) => b.timestamp.getTime() - a.timestamp.getTime());
               }
              this.setPagedList();
          })

  }


}
