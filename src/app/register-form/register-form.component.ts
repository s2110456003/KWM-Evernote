import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {KwmEvernoteService} from "../shared/kwm-evernote.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {RegisterFactory} from "../shared/register-factory";
import {NoteFormErrorMessages} from "../note-form/note-form-error-messages";
import {Register, TodoEntry} from "../shared/todo-entry";
import {TodoEntryFactory} from "../shared/todo-entry-factory";

@Component({
  selector: 'kwm-register-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink],
  templateUrl: './register-form.component.html',
  styles: ``
})
export class RegisterFormComponent implements OnInit{
  registerForm: FormGroup;
  register = RegisterFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingRegister = false;

  constructor(
    private fb: FormBuilder,
    private kwm : KwmEvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.registerForm = this.fb.group({});
  }


  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id){//updating an existing register
      this.isUpdatingRegister = true;
      this.kwm.getSingleRegister(id).subscribe(register =>{
        this.register = register;
        this.initRegister();
      });
    }
    this.initRegister();
  }

  private initRegister(){
    this.registerForm = this.fb.group({
      id: this.register.id,
      title: [this.register.title, Validators.required],


    });
    this.registerForm.statusChanges.subscribe(() =>
      this.updateErrorMessages());
  }


  submitFormRegister() {

    const register: Register = RegisterFactory.fromObject(this.registerForm.value);

    if (this.isUpdatingRegister) {
      // Aktualisiere einen bestehenden Register
      this.kwm.updateRegister(register).subscribe(res => {
        // Navigiere zur Detailansicht des aktualisierten To-Do-Entry
        this.router.navigate(['/registers', register.id]);
      }, error => {
        // Fehlerbehandlung
        console.error('Fehler beim Aktualisieren des Registers:', error);
      });
    } else {
      // Erstelle einen neues Register
      console.log(register);
      this.kwm.createRegister(register).subscribe(res => {
        // Setze das Formular zurück
        this.register = RegisterFactory.empty();
        this.registerForm.reset(RegisterFactory.empty());

        // Navigiere zur Detailansicht des neu erstellten To-Do-Entry
        this.router.navigate(['/registers', res.id]); // res.id ist die ID des neu erstellten Registers
      }, error => {
        // Fehlerbehandlung
        console.error('Fehler beim Erstellen des To-Do-Entry:', error);
      });
    }
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.registerForm.invalid);
    this.errors = {};
    // @ts-ignore
    for (const message of NoteFormErrorMessages) {
      const control = this.registerForm.get(message.forControl);
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
