import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {Tag} from "../shared/tag";
import {CategoryTagFactory} from "../shared/category-tag-factory";
import {KwmEvernoteService} from "../shared/kwm-evernote.service";
import {NoteFormErrorMessages} from "../note-form/note-form-error-messages";

@Component({
  selector: 'kwm-category-tag-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './category-tag-form.component.html',
  styles: ``
})
export class CategoryTagFormComponent implements OnInit{
  tagForm : FormGroup;
  tag: Tag = CategoryTagFactory.empty();
  errors: { [key: string]: string } = {};
  isUpdatingTag = false;


  constructor(
    private fb: FormBuilder,
    private kwm : KwmEvernoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.tagForm = this.fb.group({});
  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if(id){
      this.isUpdatingTag = true;
      this.kwm.getSingleTag(id).subscribe(tag =>{
        this.tag = tag;
        this.initTag();
      });
    }
    this.initTag();
  }

  private initTag(){
    this.tagForm  = this.fb.group({
      id: this.tag.id,
      category: [this.tag.category, Validators.required]
    });
    this.tagForm.statusChanges.subscribe(()=>
    this.updateErrorMessages());
  }


  submitFormTag(){
    const tag: Tag = CategoryTagFactory.fromObject(this.tagForm.value);

   this.kwm.createTag(tag).subscribe(tag => {
     this.tag = CategoryTagFactory.empty();
     this.tagForm.reset(CategoryTagFactory.empty());
   })
  }

  updateErrorMessages() {
    console.log("Is invalid? " + this.tagForm.invalid);
    this.errors = {};
    // @ts-ignore
    for (const message of NoteFormErrorMessages) {
      const control = this.tagForm.get(message.forControl);
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
