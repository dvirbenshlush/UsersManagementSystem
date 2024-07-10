import { Component, Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';
import { CommonModule } from '@angular/common';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-add-user-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatIconModule, CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './add-user-dialog.component.html',
  styleUrl: './add-user-dialog.component.scss'
})
export class AddUserDialogComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  onLoad: boolean = false;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private usersService: UsersService) {
  } 

  addUser() {
    this.onLoad = true;
    this.usersService.addUser(this.form.value).subscribe((data: any) => {
      this.onLoad = false;
      console.log(this.form.value);
    });
    this.dialogRef.close();
  }

}
