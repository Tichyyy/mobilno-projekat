import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Database, ref, set, get, remove } from '@angular/fire/database';

export interface PlayerStats {
  playerName: string;
  position: string;
  team: string;
  season: number;
  per: number;
  tsPercent: number;
}

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl =
    'http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataAdvancedPlayoffs/name/';

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private db: Database
  ) {}

  getPlayerStats(name: string): Observable<PlayerStats[]> {
    return this.http.get<PlayerStats[]>(`${this.apiUrl}${name}`);
  }

  addFavoritePlayer(player: PlayerStats): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      const favoritesRef = ref(
        this.db,
        `users/${userId}/favoritePlayers/${player.playerName}`
      );
      return set(favoritesRef, player);
    }
    return Promise.reject('User not logged in');
  }

  removeFavoritePlayer(playerName: string): Promise<void> {
    const user = this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      const favoritesRef = ref(
        this.db,
        `users/${userId}/favoritePlayers/${playerName}`
      );
      return remove(favoritesRef);
    }
    return Promise.reject('User not logged in');
  }

  getFavoritePlayers(): Promise<any> {
    const user = this.authService.getCurrentUser();
    if (user) {
      const userId = user.uid;
      const favoritesRef = ref(this.db, `users/${userId}/favoritePlayers`);
      return get(favoritesRef);
    }
    return Promise.reject('User not logged in');
  }
}
