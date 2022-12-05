import { Component, OnInit } from '@angular/core';
import {MainService} from "./main.service";
import {PostsService} from "./posts/posts.service";
import {AuthService} from "../auth/auth.service";
import {HttpClient} from "@angular/common/http";
import {forkJoin} from "rxjs";
import {Post} from "./posts/post";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  name: string = localStorage.getItem("userName")!
  avatar: string = ""
  headLine: string = ""
  headLineInput: string= ""
  followerInput: string= ""
  authorInput: string= ""
  textInput: string= ""
  textArea: string= ""
  followers: any[] = [];
  addFollowerErrorMessage: string = "";
  fileInput: File | null = null;

  constructor(private http:HttpClient, public mainServ: MainService, public postServ: PostsService, public authServ: AuthService) { }

  ngOnInit(): void {
    this.getFollowers()
    this.getHeadline()
    this.getAvatar()
  }

  onFileSelected(event: any){
     this.fileInput = event.target.files[0]!;
  }

  getAvatar() {
    this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/avatar`, {withCredentials: true}).subscribe(
        (response:any) => {
          this.avatar = response["avatar"]
        }
    )
  }

  getHeadline() {
   this.mainServ.getHeadline().subscribe(
       (response:any) => {
          this.headLine = response["headline"]
        }
    )
  }


  getFollowers() {
    this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/following/${localStorage.getItem('userName')}`, {withCredentials: true}).subscribe(
        (response:any) => {
          for( let i = 0 ; i < response['following'].length ; i++){
            let temp = {}
            let followingUser = response['following'][i]
            forkJoin([this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/headline/${followingUser}`, {withCredentials: true}),
              this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/avatar/${followingUser}`, {withCredentials: true}),]).subscribe((response: any[]) =>{
                this.followers.push({
                  name: followingUser,
                  headLine: response[0].headline,
                  imgSrc: response[1].avatar
                })
            })
          }
        }
    )
  }

  onClickHeadline() {
    if (this.headLineInput) {
      this.headLine = this.headLineInput
      this.http.put(`https://tc78-ricebookserver-final.herokuapp.com/headline`,{headline: this.headLine}, {withCredentials: true}
      ).subscribe( (response:any) => {
        this.headLine = response["headline"]
        this.headLineInput = ''
      })
    }
  }

  onClickAdd() {
    if(!this.followerInput) {
      this.addFollowerErrorMessage = "Please type a follower name!"
    }
    else if(this.followerInput == localStorage.getItem("userName")) {
      this.addFollowerErrorMessage = "Cannot follower yourself"
    }
    else{
      let followingUser = this.followerInput
      this.http.put(`https://tc78-ricebookserver-final.herokuapp.com/following/${this.followerInput}`,{}, {withCredentials: true}).subscribe({
        next: response => {
          forkJoin([this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/headline/${followingUser}`, {withCredentials: true}),
            this.http.get(`https://tc78-ricebookserver-final.herokuapp.com/avatar/${followingUser}`, {withCredentials: true}),]).subscribe((response: any[]) =>{
            this.followers.push({
              name: followingUser,
              headLine: response[0].headline,
              imgSrc: response[1].avatar
            })
            this.postServ.addFollowerPosts(followingUser);
            this.addFollowerErrorMessage = "";
          })
        }, error: error => {
          if(error['status'] == 409){
            this.addFollowerErrorMessage = "The follower already exists";
          }
          else if(error['status'] == 404) {
            this.addFollowerErrorMessage = "The follower does not exists"
          }
        }}
      )
    }
    this.followerInput = ""
  }

  // need to do deletePosts
  onClickDelete(name: string) {
    this.http.delete(`https://tc78-ricebookserver-final.herokuapp.com/following/${name}`, {withCredentials: true}).subscribe(
        (response:any ) => {
          this.followers = this.followers.filter(f => f.name !== name)
          this.postServ.deleteFollowerPosts(name)
    })
  }

  onClickTextArea() {

    if(this.textArea) {
      let fd = new FormData();
      if(this.fileInput){
        fd.append("image", this.fileInput!)
      }
      fd.append("text", this.textArea)

      this.http.post(`https://tc78-ricebookserver-final.herokuapp.com/article`,fd, {withCredentials: true,
        }
      ).subscribe( (response:any) => {
        let l = response["articles"].length;
        let cur = response['articles'][l-1];
        let p = new Post(cur["pid"], cur["author"], cur["text"], new Date(cur["date"]), cur["picture"]);
        this.postServ.posts.unshift(p);
        this.postServ.setPagedList()
        this.textArea = ''
      })
    }

  }

  clearTextArea() {
    this.textArea = ''
  }
}
