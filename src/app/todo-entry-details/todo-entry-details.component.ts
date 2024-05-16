import {Component, OnInit} from '@angular/core';
import {TodoEntry} from "../shared/todo-entry";
import {TodoEntryFactory} from "../shared/todo-entry-factory";
import {KwmEvernoteService} from "../shared/kwm-evernote.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import {AuthenticationService} from "../shared/authentication.service";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'kwm-todo-entry-details',
  standalone: true,
  imports: [
    RouterLink,
    DatePipe,
    NgIf
  ],
  templateUrl: './todo-entry-details.component.html',
  styles: ``
})
export class TodoEntryDetailsComponent implements OnInit {
  todo_entry: TodoEntry = TodoEntryFactory.empty();

  constructor(private kwm: KwmEvernoteService,
              private route: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              public authService: AuthenticationService) {
  }

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.kwm.getSingleTodo_entry(params['id']).subscribe((t: TodoEntry) => this.todo_entry = t);
  }

  removeToDoEntry() {
    if (confirm("ToDo Entry wirklich löschen?")) {
      this.kwm.removeTodo_entry(this.todo_entry.id).subscribe(
        () => {
          this.router.navigate(['../'],
            {relativeTo: this.route});
          this.toastr.success('ToDo Entry gelöscht!', "KWM-Evernote");
        }
      );
    }
  }
}

