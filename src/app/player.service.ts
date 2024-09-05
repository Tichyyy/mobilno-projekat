import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  constructor(private http: HttpClient) {}

  getPlayerStats(name: string): Observable<PlayerStats[]> {
    return this.http.get<PlayerStats[]>(`${this.apiUrl}${name}`);
  }
}
