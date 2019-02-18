import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  private articles: Observable<Array<any>> = null;

  constructor(private as: ArticleService) { }

  ngOnInit() {
    this.articles = this.as.getArticles();
  }

  createArticle() {
    console.log('TODO: create article');
  }

  deleteArticle(article) {
    this.as.deleteArticle(article.id);
  }

}
