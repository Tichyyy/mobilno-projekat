import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async register() {
    // Validacija unetih podataka
    if (!this.isValidEmail(this.email)) {
      await this.presentToast('Invalid email format.');
      return;
    }

    if (!this.isValidPassword(this.password)) {
      await this.presentToast('Password must be at least 6 characters long.');
      return;
    }

    try {
      await this.authService.register(this.email, this.password, this.username);

      // Prikazivanje toast poruke za uspeh
      const toast = await this.toastController.create({
        message:
          'Registration successful! You will be redirected to login page soon.',
        duration: 2000,
        color: 'success',
        position: 'top',
      });
      await toast.present();

      // Preusmeravanje na login stranicu nakon prikazivanja toast poruke
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000);
    } catch (error) {
      console.error('Registration failed', error);
      await this.presentToast('Registration failed. Please try again.');
    }
  }

  // Proverava da li je e-mail u ispravnom formatu
  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Proverava da li lozinka ispunjava minimalne zahteve
  isValidPassword(password: string): boolean {
    return password.length >= 6;
  }

  // Prikazuje toast poruku
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      color: 'danger',
      position: 'top',
    });
    await toast.present();
  }
}
