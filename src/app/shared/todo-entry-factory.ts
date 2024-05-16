/*import {TodoEntry} from "./todo-entry";

export class TodoEntryFactory {
  static empty():TodoEntry {
    return new TodoEntry(0,'',0,'',
      new Date(),[],0);
  }


  // Erzeugung eines TodoEntry aus einem Objekt
  static fromObject(rawTodoEntry: any): TodoEntry {
    return new TodoEntry(
      rawTodoEntry.id || 0, // Fallback auf 0, falls nicht vorhanden
      rawTodoEntry.title || '',
      rawTodoEntry.user_id || 0,
      rawTodoEntry.description || '',
      typeof(rawTodoEntry.due_date) === 'string' ?
        new Date(rawTodoEntry.due_date) : rawTodoEntry.due_date,
      rawTodoEntry.images || [], // Bilder als Array
      rawTodoEntry.note_id || 0, // Standard 0, falls nicht vorhanden

    );
  }

}*/

import { TodoEntry } from "./todo-entry";

export class TodoEntryFactory {
  static empty(): TodoEntry {
    // Return an empty TodoEntry with default values
    return new TodoEntry(
      0, // id
      '', // title
      0, // user_id, assuming 0 as default; adjust if necessary
      '', // description
      undefined, // due_date as undefined if you want to signify "no date"
      [], // images, empty array as default
      0, // note_id, 0 as default or adjust if necessary
    );
  }

  static fromObject(rawTodoEntry: any): TodoEntry {
    // Return a TodoEntry from an object using fallbacks for missing data
    return new TodoEntry(
      rawTodoEntry.id || 0,
      rawTodoEntry.title || '',
      rawTodoEntry.user_id || 0,
      rawTodoEntry.description || '',
      //typeof(rawTodoEntry.due_date) === 'string' ?
      //  new Date(rawTodoEntry.due_date) : rawTodoEntry.due_date,
      rawTodoEntry.due_date ? new Date(rawTodoEntry.due_date) : undefined, // Use undefined here
      rawTodoEntry.images || [],
      rawTodoEntry.note_id || 0,
    );
  }
}

