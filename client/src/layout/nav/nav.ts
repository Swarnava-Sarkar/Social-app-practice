import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountSevice } from '../../core/services/account-sevice';
import { LoginCreds } from '../../types/user';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {
  protected accountService = inject(AccountSevice);
  private router = inject(Router);
  private toast = inject(ToastService);
  protected creds: LoginCreds  = {} as LoginCreds;

  login() {
    this.accountService.login(this.creds).subscribe({
      next: result => {
        this.creds = {} as LoginCreds;
        this.router.navigateByUrl('/members');
        this.toast.success(`Welcome back! ${result.displayName}`)
      },
      error: err => {
        this.toast.error(err.error)
      }
    });
  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }
}
