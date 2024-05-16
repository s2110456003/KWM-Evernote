import {Tag} from "./tag";
import {Register} from "./register";

export class CategoryTagFactory {

  static empty():Tag{
    return new Tag(0, '');
  }

  static fromObject(rawTag:any):Tag{
    return new Tag(rawTag.id, rawTag.category)
  }
}
