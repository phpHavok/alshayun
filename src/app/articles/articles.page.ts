import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  private currentArticles: Article[];

  constructor(private articles: ArticlesService) { }

  ngOnInit() {
    this.articles.getArticles().then(articles => {
      this.currentArticles = articles;
    });
  }

  searchArticles(query: string) {
    this.articles.getArticles(query).then(articles => {
      this.currentArticles = articles;
    });
  }

  clearSearchQuery(queryField) {
    queryField.value = '';
    this.searchArticles('');
    queryField.setFocus();
  }

}
