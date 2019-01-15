import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  private article: Article;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.article = {
        id: +params.get('id'),
        title: 'TODO',
        text: 'TODO'
      }
    });
  }

}

export interface Article {
  id: number,
  title: string,
  text: string
}
