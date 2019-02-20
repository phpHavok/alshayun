import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  //readonly urlPrefix = 'http://127.0.0.1:5000';
  readonly urlPrefix = '/api';
  articlesBehaviorSubject: BehaviorSubject<Array<any>> = null;
  articlesObserver: Observable<Array<any>> = null;
  articles: Array<any> = null;

  constructor(private http: HttpClient) {
    this.articlesBehaviorSubject = new BehaviorSubject(null);
    this.articlesObserver = this.articlesBehaviorSubject.asObservable();
  }

  getArticles() {
    this.http.get(this.urlPrefix + '/articles/manifest.json', {responseType: 'text'}).subscribe(data => {
      this.articles = JSON.parse(data as string);
      this.articlesBehaviorSubject.next(this.articles);
    });
    return this.articlesObserver;
  }

  deleteArticle(id) {
    this.http.delete(this.urlPrefix + '/article/' + id).subscribe(_ => {
      this.getArticles();
    });
  }

  async getArticle(id: number) {
    let theArticle = null;
    for (let article of this.articles) {
      if (article.id === id) {
        theArticle = article;
        break;
      }
    }
    if (theArticle) {
      theArticle.text = await this.http.get(this.urlPrefix + '/articles/article.' + id + '.md', {responseType: 'text'}).toPromise();
    }
    return theArticle;
  }

  updateArticle(article) {
    let httpCall = this.http.put(this.urlPrefix + '/article/' + article.id, article);
    httpCall.subscribe(_ => {
      this.getArticles();
    });
    return httpCall;
  }
}
