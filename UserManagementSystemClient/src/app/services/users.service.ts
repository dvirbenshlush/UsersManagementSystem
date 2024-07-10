import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Users } from '../models/users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = 'https://localhost:7122/Users';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.apiUrl}/getAllUsers`).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.error('Error occurred:', error);
        // Optionally, inspect and handle different parts of the error object here
        return throwError(error); // Rethrow the error so consumers can handle it
      }));
  }

  addUser(user: Users): Observable<any> {
    return this.http.post(`${this.apiUrl}/addUser`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.error('Error occurred:', error);
        // Optionally, inspect and handle different parts of the error object here
        return throwError(error); // Rethrow the error so consumers can handle it
      }));
  }

  updateUser(id:number, user: Users): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateUser?id=${id}`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.error('Error occurred:', error);
        // Optionally, inspect and handle different parts of the error object here
        return throwError(error); // Rethrow the error so consumers can handle it
      }));
  }

  removeUser(id:number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/removeUser?id=${id}`).pipe(
      catchError((error: HttpErrorResponse) => {
        // console.error('Error occurred:', error);
        // Optionally, inspect and handle different parts of the error object here
        return throwError(error); // Rethrow the error so consumers can handle it
      }));
  }

}
