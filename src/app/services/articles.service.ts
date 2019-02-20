import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: Article[];

  constructor(private file: File, private storage: Storage, private http: HttpClient) { }

  getUrlPrefix() {
    return this.storage.get('settings.urlPrefix').then(urlPrefix => {
      return urlPrefix ? urlPrefix : 'http://127.0.0.1:5000/articles';
    });
  }

  setUrlPrefix(urlPrefix) {
    return this.storage.set('settings.urlPrefix', urlPrefix);
  }

  async loadArticles() {
    let urlPrefix = await this.getUrlPrefix();
    let data = await new Promise((resolve, reject) => {
      this.http.get(urlPrefix + '/manifest.json', { responseType: 'text' }).subscribe(data => {
        resolve(data as string);
      }, error => {
        resolve(null);
      });
    });
    if (data !== null) {
      this.articles = JSON.parse(data as string);
    } else {
      this.articles = null;
    }
  }

  async getArticles(query?: string) {
    // If no articles, load them and wait.
    if (!this.articles) {
      await this.loadArticles();
      // Still no articles? That's an error.
      if (!this.articles) {
        return null;
      }
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
    let urlPrefix = await this.getUrlPrefix();
    for (let article of this.articles) {
      if (id === article.id) {
        // Load article text if we don't have it.
        if (!article.text) {
          let data = await new Promise((resolve, reject) => {
            this.http.get(urlPrefix + '/article.' + article.id.toString() + '.md',
              { responseType: 'text' }).subscribe(data => {
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
