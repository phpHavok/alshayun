import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: Article[] = [
    { id: 1, title: 'The first article', text: 'This is an article with some longer text. We have a couple of lines to be excerpted.', tags: ['tag1', 'tag2'] },
    { id: 2, title: 'The second article', text: 'Bogus2', tags: ['tag3'] },
    { id: 3, title: 'The third article', text: 'Bogus3', tags: [] },
    { id: 4, title: 'The fourth article', text: 'Bogus4', tags: [] },
    { id: 5, title: 'The fifth article', text: 'Bogus5', tags: ['tag1', 'tag9'] },
  ];

  constructor() { }

  getArticles(query?: string) {
    if (!query || 0 === query.length) {
      return this.articles;
    } else {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(query.toLowerCase()) ||
               article.text.toLowerCase().includes(query.toLowerCase()) ||
               article.tags.filter(tag => {
                 return tag.toLowerCase().includes(query.toLowerCase());
               }).length > 0;
      });
    }
  }

  getArticle(id: number) {
    for (let article of this.articles) {
      if (id === article.id) {
        return article;
      }
    }
    return null;
  }
}

export interface Article {
  id: number,
  title: string,
  text: string,
  tags: string[]
}
