import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: Article[];
  private urlPrefix: string = 'http://saturn.ccs.uky.edu/alshayun';

  constructor(private file: File, private storage: Storage, private http: HttpClient) { }

  async loadArticles() {
    /*
    await this.file.readAsText(this.file.applicationDirectory, 'www/assets/articles/manifest.json').then(manifest => {
      this.articles = JSON.parse(manifest);
    });
    */
    let data = await new Promise((resolve, reject) => {
      this.http.get(this.urlPrefix + '/manifest.json', {responseType: 'text'}).subscribe(data => {
        resolve(data as string);
      });
    });
    this.articles = JSON.parse(data as string);
  }

  async getArticles(query?: string) {
    // If no articles, load them and wait.
    if (!this.articles) {
      await this.loadArticles();
    }
    if (!query || 0 === query.length) {
      return this.articles;
    } else {
      return this.articles.filter(article => {
        return article.title.toLowerCase().includes(query.toLowerCase()) ||
               article.excerpt.toLowerCase().includes(query.toLowerCase()) ||
               article.tags.filter(tag => {
                 return tag.toLowerCase().includes(query.toLowerCase());
               }).length > 0;
      });
    }
  }

  async getArticle(id: number) {
    for (let article of this.articles) {
      if (id === article.id) {
        // Load article text if we don't have it.
        if (!article.text) {
          /*
          await this.file.readAsText(this.file.applicationDirectory,
                                     'www/assets/articles/article.' + article.id.toString() + '.md').then(text => {
            article.text = text;
          });
          */
          let data = await new Promise((resolve, reject) => {
            this.http.get(this.urlPrefix + '/article.' + article.id.toString() + '.md',
                          {responseType: 'text'}).subscribe(data => {
              resolve(data as string);
            });
          });
          article.text = data as string;
        }
        return article;
      }
    }
    return null;
  }

  async getArticleAttributes(id: number) {
    let attrs = await this.storage.get('attrs.' + id.toString());
    if (!attrs) {
      // Default attributes.
      attrs = {
        read: false,
        readPos: 0
      }
    }
    return <ArticleAttributes>attrs;
  }

  setArticleAttributes(id: number, attrs: ArticleAttributes) {
    return this.storage.set('attrs.' + id.toString(), attrs);
  }
}

export interface Article {
  id: number,
  title: string,
  excerpt: string,
  tags: string[],
  text: string // Text is loaded separately.
}

export interface ArticleAttributes {
  read: boolean,
  readPos: number
}
