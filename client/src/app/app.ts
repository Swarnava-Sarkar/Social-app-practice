import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { Nav } from '../layout/nav/nav';
import { AccountSevice } from '../core/services/account-sevice';
import { Home } from "../features/home/home";

@Component({
  selector: 'app-root',
  imports: [Nav, Home],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit{
  private http = inject(HttpClient);
  private accountService = inject(AccountSevice);
  protected readonly title = signal('Social App');
  protected members = signal<any>([]);
  
  async ngOnInit(){
    // this.http.get('https://localhost:5001/api/members').subscribe({
    //   next: response => this.members.set(response),
    //   error: error => console.warn(error),
    //   complete: () => console.log("Request Completed")
    // });

    // this.members.set(await this.getMember());
    this.setCurrentUser();
  }

  setCurrentUser() {
    const userString = localStorage.getItem("user")
    if (!userString) return;
    const user = JSON.parse(userString);
    this.accountService.currentUser.set(user);
  }

  // async getMember()
  // {
  //   try 
  //   {
  //     return lastValueFrom(this.http.get('https://localhost:5001/api/members'));
  //   } catch (error) {
  //     console.warn(error);
  //     throw error;
  //   }
  // }
}
