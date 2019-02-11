import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleAttributes, ArticlesService } from '../services/articles.service'
import { LoadingController, IonContent } from '@ionic/angular';
import { MarkdownService } from 'ngx-markdown';
import { DomSanitizer } from '@angular/platform-browser';
import { AppletExampleComponent } from '../applets/applet-example/applet-example.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.page.html',
  styleUrls: ['./article.page.scss'],
})
export class ArticlePage implements OnInit, AfterViewChecked {
  private article: Article;
  private attrs: ArticleAttributes;
  private parsedText: string;
  @ViewChild(IonContent) content: IonContent;
  @ViewChild('container') container: ElementRef;
  private applets: HTMLElement[] = [];

  constructor(private route: ActivatedRoute,
              private articles: ArticlesService,
              private loadingCtrl: LoadingController,
              private sanitizer: DomSanitizer,
              private markdown: MarkdownService,
              private cfr: ComponentFactoryResolver,
              private injector: Injector,
              private appRef: ApplicationRef) { }

  ngOnInit() {
    this.loadArticle();
  }

  ngAfterViewChecked() {
    let container = this.container.nativeElement as HTMLElement;
    let applets = container.getElementsByTagName('applet');
    for (let i = 0; i < applets.length; ++i) {
      let applet = applets.item(i);
      if (!applet.hasChildNodes()) {
        let element: HTMLElement = null;
        if (this.applets.length >= i + 1) {
          element = this.applets[i];
        } else {
          element = this.createApplet(applet);
        }
        applet.append(element);
      }
    }
  }

  createApplet(applet: HTMLElement) {
    let component = null;
    switch (applet.getAttribute('name')) {
      case 'example':
        component = AppletExampleComponent;
        break;
      default:
        return null;
    }
    const componentRef = this.cfr.resolveComponentFactory(component).create(this.injector);
    this.appRef.attachView(componentRef.hostView);
    let element = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    this.applets.push(element);
    return element;
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
    this.parsedText = this.markdown.compile(this.article.text);
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
