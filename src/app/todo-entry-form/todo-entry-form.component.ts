import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KwmEvernoteService} from "../shared/kwm-evernote.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {TodoEntryFactory} from "../shared/todo-entry-factory";
import {NoteFormErrorMessages} from "../note-form/note-form-error-messages";
import {Note} from "../shared/note";
import {NoteFactory} from "../shared/note-factory";
import {TodoEntry} from "../shared/todo-entry";

@Component({
  selector: 'kwm-todo-entry-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './todo-entry-form.component.html',
  styles: ``
})
export class TodoEntryFormComponent implements OnInit{
  todo_entryForm : FormGroup;
  todo_entry = TodoEntryFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingTodo_entry = false;

  notes: Note[] = [];

  constructor(
  private fb: FormBuilder,
  private kwm : KwmEvernoteService,
  private route: ActivatedRoute,
  private router: Router
) {
  this.todo_entryForm = this.fb.group({});
}


 ngOnInit() {
   const id = this.route.snapshot.params['id'];
   if (id) { // we're updating an existing todo_entry
     this.isUpdatingTodo_entry = true;
     this.kwm.getSingleTodo_entry(id).subscribe(todo_entry => {
       this.todo_entry = todo_entry;
       this.initTodo_entry();
     });
   }
   this.initTodo_entry();
   this.kwm.getAll().subscribe(notes => {
     this.notes = notes;
     console.log(notes);
   });
 }

  private initTodo_entry() {
    this.todo_entryForm = this.fb.group({
      id: this.todo_entry.id,
      title: [this.todo_entry.title, Validators.required],
      description: this.todo_entry.description,
      due_date: this.todo_entry.due_date,
      note_id: this.todo_entry.note_id

    });



    this.todo_entryForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    );
  }

  submitFormTodo() {
    const todo_entry: TodoEntry = TodoEntryFactory.fromObject(this.todo_entryForm.value);

    // Fallback für user_id setzen, falls nicht vorhanden
    todo_entry.user_id = todo_entry.user_id || 1; // Beispiel: Fallback auf Benutzer 1

    if (this.isUpdatingTodo_entry) {
      this.kwm.updateTodo(todo_entry).subscribe(res => {
        this.router.navigate(['/todo_entries', todo_entry.id]);
      }, error => {
        console.error('Fehler beim Aktualisieren des To-Do-Entry:', error);
      });
    } else {
      console.log('Creating TodoEntry:', todo_entry);
      this.kwm.createTodo_entry(todo_entry).subscribe(res => {
        console.log(todo_entry);
        this.todo_entry = TodoEntryFactory.empty();
        this.todo_entryForm.reset(TodoEntryFactory.empty());
        this.router.navigate(['/todo_entries', res.id]);
        console.log('Create Response:', res);
      }, error => {
        console.error('Fehler beim Erstellen des To-Do-Entry:', error);
      });
    }
  }


  updateErrorMessages() {
    console.log("Is invalid? " + this.todo_entryForm.invalid);
    this.errors = {};
    // @ts-ignore
    for (const message of NoteFormErrorMessages) {
      const control = this.todo_entryForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }
}

