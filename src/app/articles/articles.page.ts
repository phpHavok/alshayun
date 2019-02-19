import { Component, OnInit, ViewChild } from '@angular/core';
import { Article, ArticlesService, ArticleAttributes } from '../services/articles.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  private currentArticles: Article[];
  private currentAttrs: Map<number, ArticleAttributes> = new Map<number, ArticleAttributes>();
  private articlesLoaded: boolean = false;
  private loadFailed: boolean = false;
  @ViewChild('searchbar') searchbar;

  constructor(private articles: ArticlesService, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.loadArticles();
  }

  async loadArticles() {
    if (this.searchbar) {
      this.searchbar.value = '';
    }
    this.loadFailed = false;
    this.articlesLoaded = false;
    const loading = await this.loadingCtrl.create({
      message: 'Loading articles...'
    });
    await loading.present();
    await this.articles.loadArticles();
    this.currentArticles = await this.articles.getArticles();
    if (this.currentArticles !== null) {
      await this.refreshAttributes();
      this.articlesLoaded = true;
    } else {
      this.loadFailed = true;
    }
    return await loading.dismiss();
  }

  async refreshAttributes() {
    for (let article of this.currentArticles) {
      let attrs = await this.articles.getArticleAttributes(article.id);
      this.currentAttrs.set(article.id, attrs);
    }
  }

  searchArticles(query: string) {
    if (this.articlesLoaded) {
      this.articles.getArticles(query).then(articles => {
        this.currentArticles = articles;
      });
    }
  }

  articleRead(id) {
    let attrs = this.currentAttrs.get(id);
    return attrs && attrs.read;
  }

  markUnread(id, list) {
    let attrs = this.currentAttrs.get(id);
    attrs.read = false;
    attrs.readPos = 0;
    this.articles.setArticleAttributes(id, attrs);
    list.closeSlidingItems();
  }

  ionViewWillEnter() {
    if (this.articlesLoaded) {
      this.refreshAttributes();
    }
  }

  reloadArticles(evt) {
    this.loadArticles().then(_ => {
      evt.target.complete();
    });
  }

  gotoSettings() {
    this.router.navigate(['/settings']);
  }

}
