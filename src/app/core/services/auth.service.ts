import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserInterface } from '../models/userInterface';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject: BehaviorSubject<UserInterface>;
  private currentUser: Observable<any>;
  constructor(private readonly _HttpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<UserInterface>(
      JSON.parse(JSON.stringify(localStorage.getItem('userData'))) as UserInterface
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }



  login(username: string, password: string): Observable<HttpResponse<UserInterface>> {
    console.log(username + " " + password);
    
    // Check if the username and password match a user in your database
    const users: UserInterface[] = [
      { userName: 'user', password: 'user', permissions: 'USER' },
      { userName: 'admin', password: 'admin', permissions: 'ADMIN' },
    ];


    const response: HttpResponse<UserInterface> = new HttpResponse({
      body: users.find(
        (user) =>
          user.userName === username &&
          user?.password === password
      ),
      status: 200,
      statusText: 'OK',
    });

    console.log(response);

    return of(response);
  }
}
