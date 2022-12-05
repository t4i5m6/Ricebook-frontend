import {Component, Input, OnInit} from '@angular/core';
import {Post} from "../post";
import {HttpClient} from "@angular/common/http";
import {Comment} from "./comment";
import {trigger} from "@angular/animations";

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() post:Post = new Post(-1, "", "", new Date(), "");
  name: string = localStorage.getItem("userName")!
  constructor(private http:HttpClient) { }


  ngOnInit(): void {
  }

  addComment(){
    this.http.put(`https://tc78-ricebookserver-final.herokuapp.com/articles/${this.post.id}`,{text: this.post.addCommentTextArea, commentId: -1},
        {withCredentials: true}
    ).subscribe( (response:any) => {
      let l = this.post.comments.length
      this.post.comments.push(new Comment(l, this.post.addCommentTextArea, this.name))
      this.post.addCommentTextArea = ""
    })
  }

  edit(comment: Comment){
    comment.textArea = comment.text;
    comment.editing = true;
  }

  finishComment(comment: Comment){
    console.log(comment);
    this.http.put(`https://tc78-ricebookserver-final.herokuapp.com/articles/${this.post.id}`,{text: comment.textArea, commentId: comment.id},
        {withCredentials: true}
    ).subscribe( (response:any) => {
      comment.text = comment.textArea;
      comment.textArea = "";
      comment.editing = false;
    })
  }

}
