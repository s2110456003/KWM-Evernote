import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Note, Image} from "../shared/note";
import {NoteListItemComponent} from "../note-list-item/note-list-item.component";
import {KwmEvernoteService} from "../shared/kwm-evernote.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'kwm-note-list-item',
  standalone: true,
  imports: [
    NoteListItemComponent,
    RouterLink
  ],
  templateUrl: './note-list.component.html',
  styles: ``
})
export class NoteListComponent implements OnInit{
  notes: Note[] = [];

  constructor(private kwm:KwmEvernoteService) {
  }

  ngOnInit():void{
  this.kwm.getAll().subscribe(res => this.notes = res);
  }
}

