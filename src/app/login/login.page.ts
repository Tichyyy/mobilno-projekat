import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: string = '';
  password: string = '';
  errorMessage: string = ''; // Poruka o grešci

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  async login() {
    try {
      await this.authService.login(this.email, this.password);

      // Prikazivanje toast poruke o uspešnom logovanju
      const toast = await this.toastController.create({
        message: 'Login successful! Redirecting to welcome page.',
        duration: 2000, // Trajanje poruke u milisekundama
        color: 'success',
        position: 'top',
      });
      await toast.present();

      // Redirekcija na welcome stranicu nakon prikazivanja poruke
      setTimeout(() => {
        this.router.navigate(['/welcome']);
      }, 2000); // Delay za redirekciju u skladu sa trajanjem toast poruke
    } catch (error) {
      // Prikaz greške ako login ne uspe
      this.errorMessage = 'Invalid email or password. Please try again.';
      console.error('Login failed', error);
    }
  }
}
