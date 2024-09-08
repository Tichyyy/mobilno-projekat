// stats.page.ts
import { Component, OnInit } from '@angular/core';
import { PlayerService, PlayerStats } from '../player.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  playerName: string = '';
  playerData: PlayerStats[] = [];
  errorMessage: string | null = null;
  favoritePlayers: Set<string> = new Set();

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    this.loadFavoritePlayers();
  }

  loadFavoritePlayers() {
    this.playerService.getFavoritePlayers().then(
      (snapshot) => {
        if (snapshot.exists()) {
          const favoritePlayers = snapshot.val();
          this.favoritePlayers = new Set(Object.keys(favoritePlayers));
        }
      },
      (error) => {
        console.error('Error loading favorite players:', error);
      }
    );
  }

  searchPlayer() {
    if (this.playerName.trim()) {
      this.errorMessage = null;
      this.playerData = [];

      this.playerService.getPlayerStats(this.playerName).subscribe(
        (data: PlayerStats[]) => {
          const playerMap: { [key: string]: PlayerStats } = {};

          data.forEach((item: PlayerStats) => {
            if (!playerMap[item.playerName]) {
              playerMap[item.playerName] = item;
            } else if (item.season === 2023) {
              playerMap[item.playerName] = item;
            }
          });

          this.playerData = Object.values(playerMap);
        },
        (error) => {
          this.errorMessage =
            'Došlo je do greške prilikom preuzimanja podataka, igrač ne postoji u bazi';
        }
      );
    }
  }

  toggleFavorite(player: PlayerStats) {
    if (this.favoritePlayers.has(player.playerName)) {
      this.favoritePlayers.delete(player.playerName);
      // Remove from Firebase
      this.playerService
        .removeFavoritePlayer(player.playerName)
        .catch((error) => {
          console.error('Error removing favorite player:', error);
        });
    } else {
      this.favoritePlayers.add(player.playerName);
      // Add to Firebase
      this.playerService.addFavoritePlayer(player).catch((error) => {
        console.error('Error adding favorite player:', error);
      });
    }
  }

  isFavorite(player: PlayerStats): boolean {
    return this.favoritePlayers.has(player.playerName);
  }

  getImagePath(playerName: string): string {
    if (!playerName) {
      return 'assets/player_images/default.jpg';
    }
    const formattedName = playerName.replace(/ /g, '-') + '.jpg';
    return `assets/player_images/${formattedName}`;
  }
}
