import { Component, OnInit } from '@angular/core';
import { Article } from '../article/article.page';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  private articles: Article[] = [
    { id: 1, title: 'The first article', text: 'This is an article with some longer text. We have a couple of lines to be excerpted.', tags: ['tag1', 'tag2'] },
    { id: 2, title: 'The second article', text: 'Bogus2', tags: ['tag3'] },
    { id: 3, title: 'The third article', text: 'Bogus3', tags: [] },
    { id: 4, title: 'The fourth article', text: 'Bogus4', tags: [] },
    { id: 5, title: 'The fifth article', text: 'Bogus5', tags: ['tag1', 'tag9'] },
  ];

  constructor() { }

  ngOnInit() {
  }

}
