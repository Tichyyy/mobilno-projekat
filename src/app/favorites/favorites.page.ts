import { Component, OnInit } from '@angular/core';
import { PlayerService, PlayerStats } from '../player.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  favoritePlayers: PlayerStats[] = [];

  constructor(private playerService: PlayerService) {}

  ngOnInit() {
    const favorites = localStorage.getItem('favoritePlayers');
    if (favorites) {
      const playerNames = JSON.parse(favorites);
      this.loadFavoritePlayers(playerNames);
    }
  }

  loadFavoritePlayers(names: string[]) {
    const playerObservables = names.map((name) =>
      this.playerService.getPlayerStats(name)
    );

    forkJoin(playerObservables).subscribe(
      (playersData: any[]) => {
        // Obradi podatke za svakog igrača
        this.favoritePlayers = playersData.map((playerSeasons: any[]) => {
          // Pronađi podatke za sezonu 2023
          const season2023 = playerSeasons.find(
            (player) => player.season === 2023
          );

          // Ako postoje podaci za sezonu 2023, koristi ih. Ako ne, uzmi bilo koje druge podatke.
          return season2023 ? season2023 : playerSeasons[0];
        });
      },
      (error: any) => {
        console.error(
          'Došlo je do greške prilikom učitavanja omiljenih igrača:',
          error
        );
      }
    );
  }

  getImagePath(playerName: string): string {
    if (!playerName) {
      return 'assets/player_images/default.jpg';
    }
    const formattedName = playerName.replace(/ /g, '-') + '.jpg';
    return `assets/player_images/${formattedName}`;
  }
}
