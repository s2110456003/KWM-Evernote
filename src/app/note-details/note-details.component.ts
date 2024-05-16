import {Component, OnInit} from '@angular/core';
import {Note} from "../shared/note"; // Importiert die Note-Klasse aus den shared-Modellen.
import {KwmEvernoteService} from "../shared/kwm-evernote.service"; // Importiert den Service, der für API-Anfragen verwendet wird.
import {ActivatedRoute, Router, RouterLink} from "@angular/router"; // Importiert Angular Router-Funktionalitäten für die Navigation und Routen-Parameter.
import {NoteFactory} from "../shared/note-factory"; // Importiert eine Factory zur Erstellung von Note-Objekten.
import {ToastrService} from "ngx-toastr"; // Importiert den Toastr-Service zur Anzeige von Benachrichtigungen.
import {AuthenticationService} from "../shared/authentication.service"; // Importiert den Authentifizierungsservice.
import {NgIf, NgForOf} from "@angular/common"; // Importiert grundlegende Angular-Direktiven.
import {TodoEntry} from "../shared/todo-entry"; // Importiert die TodoEntry-Klasse.
import {Tag} from "../shared/tag"; // Importiert die Tag-Klasse.

// Definiert die Komponente und ihre Metadaten
@Component({
  selector: 'kwm-note-details', // Der Selector, der im HTML verwendet wird, um diese Komponente darzustellen.
  standalone: true, // Mit Angular 14+ können Komponenten als standalone markiert werden, um sie ohne Module zu nutzen.
  imports: [RouterLink, NgIf, NgForOf], // Importiert notwendige Direktiven für die Vorlage.
  templateUrl: './note-details.component.html', // Der Pfad zur HTML-Vorlage der Komponente.
  styles: `` // Inline-Stile für die Komponente.
})
export class NoteDetailsComponent implements OnInit {
  note: Note = NoteFactory.empty(); // Die aktuell angezeigte Note, initialisiert mit einem leeren Objekt.
  todoEntries: TodoEntry[] | undefined = []; // Array aller TodoEntries, die in der Vorlage angezeigt werden können.

  tags?: Tag[] = []; // Array aller Tags, die in der Vorlage angezeigt werden können.

  // Konstruktor mit Dependency Injection
  constructor(
    private kwm: KwmEvernoteService, // Service zum Abrufen von Notizen und anderen Daten.
    private route: ActivatedRoute, // Aktiviert den Zugriff auf URL-Parameter.
    private router: Router, // Erlaubt Programm-Navigation.
    private toastr: ToastrService, // Zeigt Benachrichtigungen an.
    public authService: AuthenticationService // Bereitstellung von Authentifizierungsdiensten.
  ) {}

  // Wird beim Initialisieren der Komponente aufgerufen
  ngOnInit() {
    const params = this.route.snapshot.params;

    this.kwm.getSingle(params['id']).subscribe(
      (n: Note) => {
        this.note = n;
        this.todoEntries = n.todo_entries;
        console.log("Loaded note with tags:", this.note);
        if (!this.note.tags) {
          console.log("Note is missing tags, setting to empty array.");
          this.note.tags = [];
        }
      },

      error => console.error('Error loading note:', error)
    );
  }


  // Methode zum Entfernen einer Note
  removeNote() {
    if(confirm("Notiz wirklich löschen?")){ // Bestätigungsdialog vor dem Löschen
      this.kwm.remove(this.note.id).subscribe( // Ruft die Löschfunktion im Service auf.
        () => {
          this.router.navigate(['../'], {relativeTo: this.route}); // Navigiert zurück zur vorherigen Seite.
          this.toastr.success('Notiz gelöscht!', "KWM Evernote"); // Zeigt eine Erfolgsmeldung an.
        }
      );
    }
  }

  // Hilfsmethode zur Überprüfung, ob ein TodoEntry zur aktuellen Note gehört
  isTodoLinkedToNote(todo_entry: TodoEntry): boolean {
    return todo_entry.note_id === this.note.id; // Vergleicht die note_id des TodoEntry mit der ID der aktuellen Note.
  }
}
