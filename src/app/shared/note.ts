import {Image} from "./image";
export {Image} from "./image";
import {Register} from "./register";
import {TodoEntry} from "./todo-entry";
import {Tag} from "./tag";
export {Register} from "./register";

export class Note {
  public tags: Tag[];


  constructor(
    public id:number,
    public title:string,
    public user_id:number,
    public images?:Image[],
    public description?:string,
  //  public register_id?:number,
    public registers?: Register[],
    tags: Tag[] = [],
    public todo_entries?: TodoEntry[],
  ) {
    this.tags = tags;
  }
}
