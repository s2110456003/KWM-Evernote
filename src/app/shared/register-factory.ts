import {Register} from "./register";
import {Note} from "./note";

export class RegisterFactory {
  static empty():Register{
    return new Register(0, '', new Date());
  }

  static fromObject(rawRegister:any):Register{
    return new Register(
      rawRegister.id, rawRegister.title, typeof(rawRegister.created_at) === "string" ? new Date(rawRegister.created_at) : rawRegister.created_at);
  }
}
