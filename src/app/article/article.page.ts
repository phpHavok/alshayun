import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Article, ArticlesService } from '../services/articles.service'
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  private article: Article;

  constructor(private route: ActivatedRoute,
              private articles: ArticlesService,
              private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadArticle();
  }

  async loadArticle() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading article...'
    });
    await loading.present();
    let id = await new Promise((resolve, reject) => {
      this.route.paramMap.subscribe(params => {
        resolve(+params.get('id'));
      });
    });
    let article = await this.articles.getArticle(<number>id);
    this.article = article;
    return await loading.dismiss();
  }

}
