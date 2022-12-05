import {timestamp} from "rxjs";
import {Comment} from "./comments/comment";

export class Post {
    public author: string;
    public timestamp: Date;
    public id: number;
    public imgSrc: string;
    public text: string;
    public showComment: boolean = false;
    public editing: boolean = false;
    public textArea: string = "";
    public addCommentTextArea: string = "";
    public comments: Comment[] = []

    constructor(id: number, author:string, text:string, timestamp:Date, imgSrc:string) {
        this.id = id
        this.author = author
        this.timestamp= timestamp
        this.imgSrc = imgSrc
        this.text = text
    }
}
