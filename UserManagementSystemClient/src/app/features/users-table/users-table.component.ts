import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { Users } from '../../models/users.model';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {
  MatDialog,
  MatDialogRef,
  MatDialogActions,
  MatDialogClose,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';
import { AddUserDialogComponent } from '../../dialogs/add-user-dialog/add-user-dialog.component';
import { UpdateUserDialogComponent } from '../../dialogs/update-user-dialog/update-user-dialog.component';
import { DeleteUserDialogComponent } from '../../dialogs/delete-user-dialog/delete-user-dialog.component';


@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatIconModule, MatMenuModule, MatProgressSpinnerModule],
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.scss'
})
export class UsersTableComponent implements OnInit {

  
  displayedColumns: string[] = ['id', 'name', 'email', 'password', 'star'];
  dataSource: Users[] = [];
  onLoad: boolean = false;

  constructor(private usersService: UsersService, public dialog: MatDialog) { }
  
  ngOnInit(): void {
    this.onLoad = true;
    this.usersService.getAllUsers().subscribe((data: Users[]) => {
      this.dataSource = data;
      this.onLoad = false;
      console.log(this.dataSource);
    });
  }

  deleteUser(enterAnimationDuration: string, exitAnimationDuration: string, userDetails: Users) {
    let user: Users = {
      id: 0,
      name: '',
      email: '',
      password: ''
    }; 

    this.dialog.open(DeleteUserDialogComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: userDetails // Pass the data to the dialog component
    });
  }

  updateUser(enterAnimationDuration: string, exitAnimationDuration: string, userDetails: Users) {

    this.dialog.open(UpdateUserDialogComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
      data: userDetails // Pass the data to the dialog component
    });
  }

  addUser(enterAnimationDuration: string, exitAnimationDuration: string) {
    
    this.dialog.open(AddUserDialogComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
