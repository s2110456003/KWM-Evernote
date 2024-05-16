import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TodoEntryListItemComponent} from "../todo-entry-list-item/todo-entry-list-item.component";
import {TodoEntry} from "../shared/todo-entry";
import {KwmEvernoteService} from "../shared/kwm-evernote.service";


@Component({
  selector: 'kwm-todo-entry-list',
  standalone: true,
  imports: [
    TodoEntryListItemComponent,
    RouterLink,
  ],
  templateUrl: './todo-entry-list.component.html',
  styles: ``
})
export class TodoEntryListComponent implements OnInit {
  todo_entries:TodoEntry[] = [];

  constructor(private kwm:KwmEvernoteService) {
  }
  ngOnInit(){
    this.kwm.getAllTodo_entries().subscribe(res => this.todo_entries = res);
  }
}
