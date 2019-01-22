import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleAttributes, ArticlesService } from '../services/articles.service'
import { LoadingController, IonContent } from '@ionic/angular';
import { Location } from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit {
  private article: Article;
  private attrs: ArticleAttributes;
  @ViewChild(IonContent) content: IonContent;

  constructor(private route: ActivatedRoute,
              private articles: ArticlesService,
              private loadingCtrl: LoadingController,
              private location: Location) { }

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
    this.article = await this.articles.getArticle(<number>id);
    this.attrs = await this.articles.getArticleAttributes(<number>id);
    this.attrs.read = true;
    this.articles.setArticleAttributes(this.article.id, this.attrs);
    if (this.attrs.readPos > 0) {
      this.content.scrollToPoint(0, Math.max(this.attrs.readPos, 0));
    }
    return await loading.dismiss();
  }

  onScroll(evt) {
    this.attrs.readPos = evt.detail.scrollTop;
  }

  onScrollEnd() {
    this.articles.setArticleAttributes(this.article.id, this.attrs);
  }

}
