import {Component, Input} from '@angular/core';
import {Note} from "../shared/note";

@Component({
  selector: 'a.kwm-note-list-item',
  standalone: true,
  imports: [],
  templateUrl: './note-list-item.component.html',
  styles: ``
})
export class NoteListItemComponent {
  @Input() note:Note | undefined;
}
