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
    this.currentArticles = this.articles.getArticles();
  }

  searchArticles(query: string) {
    this.currentArticles = this.articles.getArticles(query);
  }

  clearSearchQuery(queryField) {
    queryField.value = '';
    this.searchArticles('');
    queryField.setFocus();
  }

}
