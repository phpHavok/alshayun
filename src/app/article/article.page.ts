import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticlesService } from '../services/articles.service'

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  private article: Article;

  constructor(private route: ActivatedRoute, private articles: ArticlesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.article = this.articles.getArticle(+params.get('id'));
    });
  }

}
