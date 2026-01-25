import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RegisterCreds } from '../../../types/user';
import { AccountSevice } from '../../../core/services/account-sevice';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private accountService = inject(AccountSevice);
  protected creds = {} as RegisterCreds;
  cancelRegister = output<boolean>();

  register() {
    this.accountService.register(this.creds).subscribe({
      next: result => {
        console.log(result);
        this.cancel();
      },
      error: error => console.log(error.message)
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
