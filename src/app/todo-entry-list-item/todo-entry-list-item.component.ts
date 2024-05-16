import {Component, Input} from '@angular/core';
import {TodoEntry} from "../shared/todo-entry";

@Component({
  selector: 'a.kwm-todo_entry-list-item',
  standalone: true,
  imports: [],
  templateUrl: './todo-entry-list-item.component.html',
  styles: ``
})
export class TodoEntryListItemComponent {
  @Input() todo_entry:TodoEntry | undefined;
}
