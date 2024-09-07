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
    try {
      await this.authService.register(this.email, this.password, this.username);

      // Prikazivanje toast poruke
      const toast = await this.toastController.create({
        message:
          'Registration successful! You will be redirected to login page soon.',
        duration: 2000, // Trajanje poruke u milisekundama
        color: 'success',
        position: 'top',
      });
      await toast.present();

      // Preusmeravanje na login stranicu nakon prikazivanja toast poruke
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 2000); // Ovaj delay treba da odgovara trajanju toast poruke
    } catch (error) {
      console.error('Registration failed', error);
    }
  }
}
