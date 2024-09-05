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
      // Resetuj errorMessage i staru playerData pre nego što započneš novu pretragu
      this.errorMessage = null;
      this.playerData = [];

      this.playerService.getPlayerStats(this.playerName).subscribe(
        (data: any[]) => {
          // Kreiraj mapu za praćenje igrača
          const playerMap: { [key: string]: any } = {};

          // Iteriraj kroz podatke i popuni mapu
          data.forEach((item: any) => {
            if (!playerMap[item.playerName]) {
              playerMap[item.playerName] = item;
            } else if (item.season === 2023) {
              // Ako već postoji igrač i imamo podatke za sezonu 2023, ažuriraj podatke
              playerMap[item.playerName] = item;
            }
          });

          // Pretvori mapu u niz
          this.playerData = Object.values(playerMap);
        },
        (error: any) => {
          this.errorMessage =
            'Došlo je do greške prilikom preuzimanja podataka, igrač ne postoji u bazi';
        }
      );
    }
  }

  getImagePath(playerName: string): string {
    const formattedName = playerName.replace(/ /g, '-') + '.jpg';
    return `assets/player_images/${formattedName}`;
  }
}
