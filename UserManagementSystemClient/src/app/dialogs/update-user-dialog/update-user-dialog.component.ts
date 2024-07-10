import { Component, Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Users } from '../../models/users.model';
import { CommonModule } from '@angular/common';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormGroup, FormBuilder, Validators, FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-update-user-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatIconModule, CommonModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: './update-user-dialog.component.html',
  styleUrl: './update-user-dialog.component.scss'
})
export class UpdateUserDialogComponent {

  form: FormGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  });

  onLoad: boolean = false;

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<UpdateUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private usersService: UsersService) {
  } 

  updateUser() {
    this.onLoad = true;
    console.log(this.data);
    this.usersService.updateUser(this.data.id, this.form.value).subscribe((data: any) => {
      this.onLoad = false;
    });
  }
}
