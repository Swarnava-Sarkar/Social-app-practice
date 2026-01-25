import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { tap } from 'rxjs';
import { LoginCreds, RegisterCreds, User } from '../../types/user';

@Injectable({
  providedIn: 'root',
})
export class AccountSevice {
  private http = inject(HttpClient);
  currentUser = signal<User | null>(null);

  baseURL = 'https://localhost:5001/api/';

  register(creds: RegisterCreds) {
    return this.http.post<User>(this.baseURL + 'account/register', creds).pipe(
      tap( user =>{
        if(user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  login(creds: LoginCreds) {
    return this.http.post<User>(this.baseURL + 'account/login', creds).pipe(
      tap( user =>{
        if(user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  logout() {
    this.currentUser.set(null);
    localStorage.removeItem("user");
  }

  setCurrentUser(user : User) {
    this.currentUser.set(user);
    localStorage.setItem("user",JSON.stringify(user));
  }
}
