import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/auth/login.service';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  imports: [FormsModule, CommonModule, RouterModule],
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {
  formData = {
    email: '',
    password: '',
    remember: false,
  };

  constructor(private loginService: LoginService, private router: Router) {}

  onSubmit(form: any): void {
    if (form.valid) {
      const credentials = {
        email: this.formData.email,
        password: this.formData.password,
      };

      this.loginService.signIn(credentials).subscribe({
        next: (res) => {
          console.log('Login success', res);
          this.router.navigate(['/user']);
        },
        error: (err) => {
          console.error('Login failed', err);
          alert('Login failed. Please check your credentials.');
        },
      });
    } else {
      alert('Please fill in both email and password.');
    }
  }
}
