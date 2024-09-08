import { Component, OnInit } from '@angular/core';
import { PlayerService, PlayerStats } from '../player.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoritePlayers: PlayerStats[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.loadFavoritePlayers();
  }

  loadFavoritePlayers() {
    this.playerService
      .getFavoritePlayers()
      .then((snapshot) => {
        if (snapshot.exists()) {
          const favoritePlayers = snapshot.val();
          this.favoritePlayers = Object.values(favoritePlayers);
        } else {
          console.log('No favorite players found.');
        }
      })
      .catch((error) => {
        console.error('Error loading favorite players:', error);
      });
  }

  getImagePath(playerName: string): string {
    if (!playerName) {
      return 'assets/player_images/default.jpg';
    }
    const formattedName = playerName.replace(/ /g, '-') + '.jpg';
    return `assets/player_images/${formattedName}`;
  }
}
