import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddEditFormComponent } from '../add-edit-form/add-edit-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private _dialog: MatDialog){}

  openForm(){
    const formRef = this._dialog.open(AddEditFormComponent);
  }
}
