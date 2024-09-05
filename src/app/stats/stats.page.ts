import { Component, OnInit } from '@angular/core';
import { PlayerService, PlayerStats } from '../player.service'; // Dodali smo PlayerStats interfejs

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  playerName: string = ''; // Prazan unos
  playerData: PlayerStats[] = [];
  errorMessage: string | null = null;
  favoritePlayers: Set<string> = new Set();

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    // Učitaj omiljene igrače iz localStorage
    const favorites = localStorage.getItem('favoritePlayers');
    if (favorites) {
      this.favoritePlayers = new Set(JSON.parse(favorites));
    }
  }

  searchPlayer() {
    if (this.playerName.trim()) {
      this.errorMessage = null;
      this.playerData = [];

      this.playerService.getPlayerStats(this.playerName).subscribe(
        (data: PlayerStats[]) => {
          const playerMap: { [key: string]: PlayerStats } = {};

          // Proveri da li API vraća podatke za više sezona
          data.forEach((item: PlayerStats) => {
            // Ako igrač već postoji u mapi, uzimamo sezonske podatke za 2023
            if (!playerMap[item.playerName]) {
              playerMap[item.playerName] = item;
            } else if (item.season === 2023) {
              playerMap[item.playerName] = item;
            }
          });

          // Sačuvamo podatke u playerData
          this.playerData = Object.values(playerMap);
        },
        (error: any) => {
          this.errorMessage =
            'Došlo je do greške prilikom preuzimanja podataka, igrač ne postoji u bazi';
        }
      );
    }
  }

  toggleFavorite(player: PlayerStats) {
    if (this.favoritePlayers.has(player.playerName)) {
      this.favoritePlayers.delete(player.playerName);
    } else {
      this.favoritePlayers.add(player.playerName);
    }

    // Ažuriraj localStorage
    localStorage.setItem(
      'favoritePlayers',
      JSON.stringify(Array.from(this.favoritePlayers))
    );
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
