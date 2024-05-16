import {Image} from "./image";
export {Image} from "./image";
import {Register} from "./register";
export {Register} from "./register";
export class TodoEntry {
  constructor(
    public id: number,
    public title: string,
    public user_id:number,
    public description?: string,
    public due_date?: Date,
    public images?:Image[],
    public note_id?: number,
    public register_id?: number
  ) {}
}
