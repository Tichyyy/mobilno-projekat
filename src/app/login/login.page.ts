import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Dodaj ovu promeljivu za prikaz greške

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);
      this.router.navigate(['/welcome']); // Redirektuj na početnu stranicu nakon uspešne prijave
    } catch (error) {
      // Postavi odgovarajuću poruku greške
      this.errorMessage = 'Invalid email or password. Please try again.';
      console.error('Login failed', error);
    }
  }
}
