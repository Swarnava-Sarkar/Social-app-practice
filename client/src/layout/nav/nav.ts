import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountSevice } from '../../core/services/account-sevice';
import { LoginCreds } from '../../types/user';

@Component({
  selector: 'app-nav',
  imports: [FormsModule],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountSevice);
  protected creds: LoginCreds  = {} as LoginCreds;

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        console.log(result);
        this.creds = {} as LoginCreds;
      },
      error: err => alert(err.message)
    });
  }

  logout() {
    this.accountService.logout();
  }
}
