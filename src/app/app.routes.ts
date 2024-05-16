import {Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {NoteListComponent} from "./note-list/note-list.component";
import {NoteDetailsComponent} from "./note-details/note-details.component";
import {NoteFormComponent} from "./note-form/note-form.component";
import {TodoEntryListComponent} from "./todo-entry-list/todo-entry-list.component";
import {TodoEntryDetailsComponent} from "./todo-entry-details/todo-entry-details.component";
import {LoginComponent} from "./login/login.component";
import {canNavigateToAdminGuard} from "./can-navigate-to-admin.guard";
import {TodoEntryFormComponent} from "./todo-entry-form/todo-entry-form.component";
import {FormsWrapperComponent} from "./forms-wrapper/forms-wrapper.component";
import {RegisterListComponent} from "./register-list/register-list.component";
import {RegisterDetailsComponent} from "./register-details/register-details.component";
import {RegisterFormComponent} from "./register-form/register-form.component";
import {CategoryTagFormComponent} from "./category-tag-form/category-tag-form.component";

export const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'registers', component: RegisterListComponent},
  {path: 'registers/:id', component: RegisterDetailsComponent},
  {path: 'notes', component: NoteListComponent},
  {path: 'notes/:id', component: NoteDetailsComponent},
  {path: 'todo_entries', component: TodoEntryListComponent},
  {path: 'todo_entries/:id', component: TodoEntryDetailsComponent},
  {path: 'admin', component: FormsWrapperComponent},
  {path: 'admin/note-form', component: NoteFormComponent},
  {path: 'admin/note-form/:id', component: NoteFormComponent},
  {path: 'admin/todo-form', component: TodoEntryFormComponent},
  {path: 'admin/todo-form/:id', component: TodoEntryFormComponent},
  {path: 'admin/register-form', component: RegisterFormComponent},
  {path: 'admin/register-form/:id', component: RegisterFormComponent},
  {path: 'admin/tag-form', component: CategoryTagFormComponent},
  {path: 'login', component: LoginComponent}
];
