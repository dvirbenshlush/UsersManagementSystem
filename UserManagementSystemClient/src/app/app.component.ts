import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { UsersTableComponent } from './features/users-table/users-table.component';
import { MatDialog } from '@angular/material/dialog';
import { AddUserDialogComponent } from './dialogs/add-user-dialog/add-user-dialog.component';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HttpClientModule, UsersTableComponent, MatButtonModule],
  providers: [UsersService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private usersService: UsersService, public dialog: MatDialog) { }

  
  addUser(enterAnimationDuration: string, exitAnimationDuration: string) {
    
    this.dialog.open(AddUserDialogComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
