import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private apiUrl =
    'http://b8c40s8.143.198.70.30.sslip.io/api/PlayerDataAdvancedPlayoffs/name/';

  constructor(private http: HttpClient) {}

  getPlayerStats(name: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}${name}`);
  }
}
