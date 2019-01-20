import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService } from '../services/articles.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.page.html',
  styleUrls: ['./articles.page.scss'],
})
export class ArticlesPage implements OnInit {
  private currentArticles: Article[];

  constructor(private articles: ArticlesService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadArticles();
  }

  async loadArticles() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading articles...'
    });
    await loading.present();
    let articles = await this.articles.getArticles();
    this.currentArticles = articles;
    return await loading.dismiss();
  }

  searchArticles(query: string) {
    this.articles.getArticles(query).then(articles => {
      this.currentArticles = articles;
    });
  }

}
