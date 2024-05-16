import { Component } from '@angular/core';
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {SearchComponent} from "../search/search.component";
import {Note} from "../shared/note";
import {TodoEntry} from "../shared/todo-entry";

@Component({
  selector: 'kwm-home',
  standalone: true,
  imports: [
    RouterLink,
    SearchComponent
  ],
  templateUrl: './home.component.html',
  styles: 'KWM-Evernote-Client\\kwmEvernote\\src\\styles.css'
})
export class HomeComponent {

  constructor(private router: Router, private route: ActivatedRoute) {
  }

}
