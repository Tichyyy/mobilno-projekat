import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
})
export class WelcomePage {
  isDarkMode = false; // Light theme by default

  constructor() {
    this.applyDefaultTheme(); // Apply default theme on page load
  }

  // Apply default (light) theme on initialization
  applyDefaultTheme() {
    const body = document.querySelector('ion-content.welcome-page');
    if (!this.isDarkMode) {
      body?.classList.add('light-theme'); // Add light theme by default
      body?.classList.remove('dark-theme');
    }
  }

  // Toggle theme between light and dark
  toggleTheme() {
    const body = document.querySelector('ion-content.welcome-page');
    if (this.isDarkMode) {
      body?.classList.add('dark-theme');
      body?.classList.remove('light-theme');
    } else {
      body?.classList.add('light-theme');
      body?.classList.remove('dark-theme');
    }
  }
}
