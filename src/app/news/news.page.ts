import { Component, OnInit } from '@angular/core';
import { NbaNewsService } from '../nba-news.service';
import { NBANews } from '../nba-news.model';

@Component({
  selector: 'app-chords',
  templateUrl: './news.page.html',
  styleUrls: ['./news.page.scss'],
})
export class NewsPage implements OnInit {
  nbaNews: NBANews | null = null; // Originalne vesti
  filteredNews: NBANews['articles'] | null = null; // Filtrirane vesti
  error: string | null = null;

  constructor(private nbaNewsService: NbaNewsService) {}

  ngOnInit() {
    this.nbaNewsService.getNBAHeadlines().subscribe({
      next: (data: NBANews) => {
        this.nbaNews = data;
        this.filteredNews = data.articles; // Inicijalno prikaži sve vesti
      },
      error: (err) => {
        this.error = 'Error loading news';
      },
    });
  }

  // Funkcija za filtriranje vesti prema unetoj reči u pretraživaču
  filterNews(event: any) {
    const searchTerm = event.target.value.toLowerCase(); // Uzimamo vrednost iz pretrage

    // Provera da li postoje vesti pre nego što pokušaš filtriranje
    if (this.nbaNews?.articles) {
      if (searchTerm && searchTerm.trim() !== '') {
        // Filtriranje prema naslovu i opisu vesti
        this.filteredNews = this.nbaNews.articles.filter(
          (article) =>
            article.headline.toLowerCase().includes(searchTerm) ||
            article.description.toLowerCase().includes(searchTerm)
        );
      } else {
        // Ako je pretraga prazna, prikazujemo sve vesti
        this.filteredNews = this.nbaNews.articles;
      }
    }
  }
}
