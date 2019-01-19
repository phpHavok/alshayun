import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file/ngx';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private articles: Article[];

  constructor(private file: File) { }

  async getArticles(query?: string) {
    // If no articles, load them and wait.
    if (!this.articles) {
      await this.file.readAsText(this.file.applicationDirectory, 'www/assets/articles/manifest.json').then(manifest => {
        this.articles = JSON.parse(manifest);
      });
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
          await this.file.readAsText(this.file.applicationDirectory,
                                     'www/assets/articles/article.' + article.id.toString() + '.md').then(text => {
            article.text = text;
          });
        }
        return article;
      }
    }
    return null;
  }
}

export interface Article {
  id: number,
  title: string,
  excerpt: string,
  tags: string[],
  text: string // Text is loaded separately.
}
