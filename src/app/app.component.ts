import { Component } from '@angular/core';
import {RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {NoteListComponent} from "./note-list/note-list.component";
import {Note} from "./shared/note";
import {NoteDetailsComponent} from "./note-details/note-details.component";
import {TodoEntryListComponent} from "./todo-entry-list/todo-entry-list.component";
import {TodoEntryDetailsComponent} from "./todo-entry-details/todo-entry-details.component";
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    NoteListComponent, NoteDetailsComponent,
    TodoEntryListComponent, TodoEntryDetailsComponent,
    RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styles: 'KWM-Evernote-Client\\kwmEvernote\\src\\styles.css'
})
export class AppComponent {
  constructor(private authService: AuthenticationService) { }
  isLoggedIn() {
    return this.authService.isLoggedIn();
  }
  getLoginLabel(){
    if(this.isLoggedIn()){
      return "Logout";
    } else {
      return "Login";
    }
  }
}
