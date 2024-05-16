import {Note} from "./note";

export class Register {
  constructor(
    public id:number,
    public title:string,
    public created_at: Date,
  public notes:Note[] = []
) {}
}
