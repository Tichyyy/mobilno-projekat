import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FavoritePlayersService {
  private favoritePlayers: any[] = [];

  constructor() {}

  // Dodaj igrača u omiljene
  addPlayerToFavorites(player: any) {
    const existingPlayer = this.favoritePlayers.find(
      (p) => p.playerName === player.playerName
    );
    if (!existingPlayer) {
      this.favoritePlayers.push(player);
    }
  }

  // Vrati sve omiljene igrače
  getFavoritePlayers() {
    return this.favoritePlayers;
  }

  // Ukloni igrača iz omiljenih
  removePlayerFromFavorites(player: any) {
    this.favoritePlayers = this.favoritePlayers.filter(
      (p) => p.playerName !== player.playerName
    );
  }
}
