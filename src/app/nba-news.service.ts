import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NBANews } from './nba-news.model';

@Injectable({
  providedIn: 'root',
})
export class NbaNewsService {
  private apiUrl =
    'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news';

  constructor(private http: HttpClient) {}

  getNBAHeadlines(): Observable<NBANews> {
    return this.http.get<NBANews>(this.apiUrl);
  }
}
