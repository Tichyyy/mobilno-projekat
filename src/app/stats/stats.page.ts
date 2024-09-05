import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../player.service'; // Prilagodi putanju

@Component({
  selector: 'app-stats',
  templateUrl: './stats.page.html',
  styleUrls: ['./stats.page.scss'],
})
export class StatsPage implements OnInit {
  playerName: string = ''; // Prazan unos
  playerData: any[] = [];
  errorMessage: string | null = null;

  constructor(private playerService: PlayerService) {}

  ngOnInit() {}

  searchPlayer() {
    if (this.playerName.trim()) {
      this.playerService.getPlayerStats(this.playerName).subscribe(
        (data: any[]) => {
          // Filtriraj podatke za sezonu 2023
          this.playerData = data.filter((item: any) => item.season === 2023);
        },
        (error: any) => {
          this.errorMessage =
            'Došlo je do greške prilikom preuzimanja podataka.';
        }
      );
    }
  }

  getImagePath(playerName: string): string {
    const formattedName = playerName.replace(/ /g, '-') + '.jpg';
    return `assets/player_images/${formattedName}`;
  }
}
