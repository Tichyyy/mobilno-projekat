import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MenuController } from '@ionic/angular'; // Uvezi MenuController

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController // Injektuj MenuController
  ) {}

  async logout() {
    try {
      // Zatvori meni
      await this.menuController.close();
      // Odjavi korisnika
      await this.authService.logout();
      // Redirektuj na login stranicu nakon odjave
      this.router.navigate(['/pocetna']);
    } catch (error) {
      console.error('Logout failed', error);
    }
  }
}
