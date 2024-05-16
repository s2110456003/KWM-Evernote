import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NoteFactory} from "../shared/note-factory";
import {KwmEvernoteService} from "../shared/kwm-evernote.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Note, Register} from "../shared/note";
import {NoteFormErrorMessages} from "./note-form-error-messages";

import {TodoEntryFactory} from "../shared/todo-entry-factory";
import {ToastrService} from "ngx-toastr";
import {Tag} from "../shared/tag";

@Component({
  selector: 'kwm-note-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './note-form.component.html',
  styles: ``
})
export class NoteFormComponent implements OnInit{
  noteForm : FormGroup;
  note = NoteFactory.empty();
  todo_entry = TodoEntryFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingNote = false;
  images: FormArray;
  registers:Register[] = [];
  register_id: number | undefined;
  tags:Tag[] = [];
  tag_id: number  | undefined;


  constructor(
    private fb: FormBuilder,
    private kwm:KwmEvernoteService,
    private route:ActivatedRoute,
    private toastr: ToastrService,
    private router:Router,

  ) {
    this.noteForm = this.fb.group({});
    this.images = this.fb.array([]);
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id){//updating an existing note
      this.isUpdatingNote = true;
      this.kwm.getSingle(id).subscribe(note =>{
        this.note = note;
        this.initNote();
      });
    }
    this.initNote();
    this.kwm.getAllRegisters().subscribe(registers =>{
      this.registers = registers;
    });
    this.kwm.getAllCategoryTags().subscribe(tags =>{
      this.tags = tags;
    })
  }


  private initNote() {
    // Setze die Werte des Formulars
    this.noteForm = this.fb.group({
      id: this.note.id,
      title: [this.note.title, Validators.required],
      description: this.note.description,
      images: this.images,
      register_id: this.register_id,
      tag_id: this.tag_id


    });

    // Rufe die Methode auf, um das `images`-Array mit den Bilddaten zu füllen
    this.buildThumbnailsArray();

    // Fehlernachrichten aktualisieren
    this.noteForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    );
  }
  buildThumbnailsArray() {
    if(this.note.images){
      this.images = this.fb.array([]);
      for (let img of this.note.images) {
        let fg = this.fb.group({
          id: new FormControl(img.id), //this.fb.control(img.id),
          url: new FormControl(img.url, [Validators.required]),
          title: new FormControl(img.title, [Validators.required])
        });
        this.images.push(fg);
      }
    }
  }
  addThumbnailControl() {
    this.images.push(this.fb.group({ id: 0, url: null, title: null }));
  }

  submitForm() {
    // Filter empty values
    this.noteForm.value.images = this.noteForm.value.images.filter(
      (thumbnail: { url: string }) => thumbnail.url
    );

    const note: Note = NoteFactory.fromObject(this.noteForm.value);
    if (this.isUpdatingNote) {
      this.kwm.update(note).subscribe(res => {
        this.router.navigate(["../../notes", note.id], { relativeTo: this.route });
      });
    } else {
      note.user_id = note.user_id || 1;  // Fallback for user_id if not set
      console.log('Creating Note:', note);
      this.kwm.create(note).subscribe(res => {
        // If a register is selected, assign the note to the register

        if (this.noteForm.value.register_id) {
          this.kwm.assignNoteToRegister(res.id, this.noteForm.value.register_id).subscribe(() => {
            console.log('Note assigned to register successfully');
          }, error => {
            console.error('Error assigning note to register:', error);
          });
        }
        if (this.noteForm.value.tag_id) {
          this.kwm.assignTagToNote(res, this.noteForm.value.tag_id).subscribe(() => {
            console.log('Tag assigned to note successfully');
          }, error => {
            console.error('Error assigning tag to note:', error);
          });
        }

        this.note = NoteFactory.empty();
        this.noteForm.reset(NoteFactory.empty());
        this.router.navigate(["../../notes"], { relativeTo: this.route });
      }, error => {
        console.error('Error creating note:', error);
      });
    }
  }



  updateErrorMessages() {
    console.log("Is invalid? " + this.noteForm.invalid);
    this.errors = {};
    // @ts-ignore
    for (const message of NoteFormErrorMessages) {
      const control = this.noteForm.get(message.forControl);
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
