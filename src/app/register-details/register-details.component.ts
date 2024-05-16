import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { KwmEvernoteService } from "../shared/kwm-evernote.service";
import { ToastrService } from "ngx-toastr";
import { AuthenticationService } from "../shared/authentication.service";
import { Register } from "../shared/register"; // Stellen Sie sicher, dass Register korrekt importiert wird
import { RegisterFactory } from "../shared/register-factory";
import {NgForOf, NgIf} from "@angular/common";
import {Note} from "../shared/note";
import {TodoEntry} from "../shared/todo-entry";

@Component({
  selector: 'kwm-register-details',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './register-details.component.html',
  styles: ``
})
export class RegisterDetailsComponent implements OnInit {
  register: Register = RegisterFactory.empty();


  constructor(
    private kwm: KwmEvernoteService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    public authService: AuthenticationService
  ) {}

  ngOnInit() {
    const params = this.route.snapshot.params;
    this.kwm.getSingleRegister(params['id']).subscribe(
      (register: Register) => this.register = register,
      error => console.error('Error loading register', error)
    );
  }

  removeRegister() {
    if (confirm("Register wirklich löschen?")) {
      this.kwm.removeRegister(this.register.id).subscribe(
        () => {
          this.router.navigate(['../'], { relativeTo: this.route });
          this.toastr.success('Register gelöscht!', "KWM Evernote");
        },
        error => console.error('Error deleting register', error)
      );
    }
  }


}
