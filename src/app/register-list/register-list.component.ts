import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {KwmEvernoteService} from "../shared/kwm-evernote.service";
import {Register} from "../shared/register";
import {RegisterListItemComponent} from "../register-list-item/register-list-item.component";

@Component({
  selector: 'kwm-register-list',
  standalone: true,
  imports: [
    RegisterListItemComponent,
    RouterLink
  ],
  templateUrl: './register-list.component.html',
  styles: ``
})
export class RegisterListComponent implements OnInit{
  registers: Register[] = [];
  constructor(private kwm:KwmEvernoteService) {
  }


  ngOnInit():void{
    this.kwm.getAllRegisters().subscribe(res => this.registers = res);
  }
}
