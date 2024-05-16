import { Component } from '@angular/core';
import {TodoEntryFormComponent} from "../todo-entry-form/todo-entry-form.component";
import {NoteFormComponent} from "../note-form/note-form.component";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'kwm-forms-wrapper',
  standalone: true,
  imports: [
    TodoEntryFormComponent,
    NoteFormComponent,
    RouterOutlet,
    RouterLink
  ],
  templateUrl: './forms-wrapper.component.html',
  styles: ``
})
export class FormsWrapperComponent {

}
