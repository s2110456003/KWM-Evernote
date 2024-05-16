import {Injectable} from '@angular/core';
import {Note, Register} from "./note";
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, retry, throwError} from "rxjs";
import {TodoEntry} from "./todo-entry";
import {Tag} from "./tag";

@Injectable({
  providedIn: 'root'
})
export class KwmEvernoteService {
  private api = 'http://kwm-evernote.s2110456003.student.kwmhgb.at/api';


  constructor(private http:HttpClient) {

  }

  getAll():Observable<Array<Note>>{
    return this.http.get<Array<Note>>(`${this.api}/notes`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllTodo_entries():Observable<Array<TodoEntry>>{
    return this.http.get<Array<TodoEntry>>(`${this.api}/todo_entries`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getAllRegisters():Observable<Array<Register>>{
    return this.http.get<Array<Register>>(`${this.api}/registers`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  getAllCategoryTags():Observable<Array<Tag>>{
    return  this.http.get<Array<Tag>>(`${this.api}/tags`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingle(id:number):Observable<Note>{
    return this.http.get<Note>(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }

  getSingleTodo_entry(id:number):Observable<TodoEntry>{
    return this.http.get<TodoEntry>(`${this.api}/todo_entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  getSingleRegister(id:number):Observable<Register>{
    return this.http.get<Register>(`${this.api}/registers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }
  getSingleTag(id:number):Observable<Tag>{
    return this.http.get<Tag>(`${this.api}/tags/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler))
  }


  remove(id:number):Observable<any>{
    return this.http.delete(`${this.api}/notes/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeTodo_entry(id:number):Observable<any>{
    return this.http.delete(`${this.api}/todo_entries/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  removeRegister(id:number):Observable<any>{
    return this.http.delete(`${this.api}/registers/${id}`)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(note:Note):Observable<any>{
    return this.http.post(`${this.api}/notes`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createTodo_entry(todo_entry:TodoEntry):Observable<any>{
    return this.http.post(`${this.api}/todo_entries`, todo_entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createRegister(register:Register):Observable<any>{
    return this.http.post(`${this.api}/registers`, register)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  createTag(tag:Tag):Observable<any>{
    return this.http.post(`${this.api}/tags`, tag)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(note:Note):Observable<any>{
    return this.http.put(`${this.api}/notes/${note.id}`, note)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateTodo(todo_entry:TodoEntry):Observable<any>{
    return this.http.put(`${this.api}/todo_entries/${todo_entry.id}`, todo_entry)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  updateRegister(register:Register):Observable<any>{
    return this.http.put(`${this.api}/registers/${register.id}`, register)
      .pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getAllSearch(searchTerm: string): Observable<{notes: Note[], todo_entries: TodoEntry[]}> {
    // Beispielimplementation: Passendes HTTP GET-Request
    return this.http.get<{notes: Note[], todo_entries: TodoEntry[]}>(`/api/search/${searchTerm}`);
  }

  assignNoteToRegister(noteId: number, registerId: number): Observable<any> {
    return this.http.post(`${this.api}/registers/${registerId}/assign-notes`, { noteIds: [noteId] })
      .pipe(retry(3), catchError(this.errorHandler));
  }

  assignTagToNote(note: Note, tag_id: number): Observable<any>{
    return this.http.post(`${this.api}/notes/${(note.id)}/tags`, {tag_id:[tag_id]})
      .pipe(retry(3), catchError(this.errorHandler));
  }

  private errorHandler(error:Error | any):Observable<any>{
    return throwError(error);
  }
}
