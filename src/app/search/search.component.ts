import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap, tap} from "rxjs";
import {Note} from "../shared/note";
import {KwmEvernoteService} from "../shared/kwm-evernote.service";
import {NgClass} from "@angular/common";
import {TodoEntry} from "../shared/todo-entry";

@Component({
  selector: 'kwm-search',
  standalone: true,
  imports: [
    NgClass
  ],
  templateUrl: './search.component.html',
  styles: ``
})
export class SearchComponent implements OnInit{
  keyup = new EventEmitter < string>();
  foundNotes: Note[] = [];
  foundToDo_entries: TodoEntry[] = [];
  isLoading = false;
  @Output() noteSelected = new EventEmitter<Note>();
  @Output() todo_entrySelected = new EventEmitter<TodoEntry>();

  constructor(private kwm:KwmEvernoteService) {
  }

  ngOnInit() {
    this.keyup.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.kwm.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false)
    ).subscribe(response => {
      // Hier nehmen wir an, dass `response` ein Objekt ist, das `{notes, todo_entries}` enthält
      this.foundNotes = response.notes;
      this.foundToDo_entries = response.todo_entries;
      console.log(this.foundNotes, this.foundToDo_entries);
    });
  }

  selectNote(note: Note) {
    this.noteSelected.emit(note);
  }

  selectTodoEntry(todo_entry: TodoEntry) {
    this.todo_entrySelected.emit(todo_entry);
  }
}


