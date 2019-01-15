import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article.page';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  private articles: Article[] = [
    { id: 1, title: 'The first article', text: 'Bogus1' },
    { id: 2, title: 'The second article', text: 'Bogus2' },
    { id: 3, title: 'The third article', text: 'Bogus3' },
    { id: 4, title: 'The fourth article', text: 'Bogus4' },
    { id: 5, title: 'The fifth article', text: 'Bogus5' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
