import { Component, OnInit, ViewChild } from '@angular/core';
import { Article, ArticlesService, ArticleAttributes } from '../services/articles.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  private currentArticles: Article[];
  private currentAttrs: Map<number, ArticleAttributes> = new Map<number, ArticleAttributes>();
  private articlesLoaded: boolean = false;
  @ViewChild('searchbar') searchbar;

  constructor(private articles: ArticlesService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadArticles();
  }

  async loadArticles() {
    this.articlesLoaded = false;
    this.searchbar.value = '';
    const loading = await this.loadingCtrl.create({
      message: 'Loading articles...'
    });
    await loading.present();
    await this.articles.loadArticles();
    this.currentArticles = await this.articles.getArticles();
    await this.refreshAttributes();
    this.articlesLoaded = true;
    return await loading.dismiss();
  }

  async refreshAttributes() {
    for (let article of this.currentArticles) {
      let attrs = await this.articles.getArticleAttributes(article.id);
      this.currentAttrs.set(article.id, attrs);
    }
  }

  searchArticles(query: string) {
    this.articles.getArticles(query).then(articles => {
      this.currentArticles = articles;
    });
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

}
