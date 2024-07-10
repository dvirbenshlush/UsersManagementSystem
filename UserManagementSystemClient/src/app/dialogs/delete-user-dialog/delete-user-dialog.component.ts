import { Component, Inject } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { MatDialogContent, MatDialogActions, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-delete-user-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatButtonModule],
  templateUrl: './delete-user-dialog.component.html',
  styleUrl: './delete-user-dialog.component.scss'
})
export class DeleteUserDialogComponent {

  onLoad: boolean = false;

  constructor(public dialogRef: MatDialogRef<DeleteUserDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any, private usersService: UsersService) {
  } 

  updateUser() {
    this.onLoad = true;
    console.log(this.data);
    this.usersService.removeUser(this.data.id).subscribe((data: any) => {
      this.onLoad = false;
    });
    this.dialogRef.close();
  }
}
