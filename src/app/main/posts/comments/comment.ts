export class Comment {

    public id: number;
    public text: string;
    public author: string;
    public editing: boolean = false;
    public textArea: string = "";

    constructor(id: number, text:string, author:string) {
        this.id = id
        this.text = text
        this.author = author
    }
}