import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleAttributes, ArticlesService } from '../services/articles.service'
import { LoadingController, IonContent } from '@ionic/angular';
import { MarkdownService } from 'ngx-markdown';
import { DomSanitizer } from '@angular/platform-browser';
import { AppletExampleComponent } from '../applets/applet-example.component';
import { Applet } from '../applets/applet';
import { AppletsService } from '../applets/applets.service';

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
  @ViewChild('header', { read: ElementRef }) header: ElementRef;
  private applets: HTMLElement[] = [];
  private processScrolls = true;

  constructor(private route: ActivatedRoute,
    private articles: ArticlesService,
    private loadingCtrl: LoadingController,
    private sanitizer: DomSanitizer,
    private markdown: MarkdownService,
    private cfr: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private renderer: Renderer,
    private apps: AppletsService) { }

  ngOnInit() {
    this.loadArticle();
  }

  ngAfterViewChecked() {
    if (this.container) {
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
  }

  createApplet(applet: HTMLElement) {
    let app = this.apps.createApplet(applet, this.cfr, this.injector, this.appRef, fullscreen => {
      this.processScrolls = !fullscreen;
      this.renderer.setElementClass(this.header.nativeElement, 'hidden', fullscreen);
      if (this.processScrolls) {
        this.content.scrollToPoint(0, Math.max(this.attrs.readPos, 0));
      }
    });
    this.applets.push(app);
    return app;
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
    if (this.article !== null && this.article.text !== null) {
      this.parsedText = this.markdown.compile(this.article.text);
      this.attrs = await this.articles.getArticleAttributes(<number>id);
      this.attrs.read = true;
      this.articles.setArticleAttributes(this.article.id, this.attrs);
      if (this.attrs.readPos > 0) {
        this.content.scrollToPoint(0, Math.max(this.attrs.readPos, 0));
      }
    } else {
      this.parsedText = '<p>Failed to load article.</p>';
    }
    return await loading.dismiss();
  }

  onScroll(evt) {
    if (this.processScrolls) {
      this.attrs.readPos = evt.detail.scrollTop;
    }
  }

  onScrollEnd() {
    if (this.processScrolls) {
      this.articles.setArticleAttributes(this.article.id, this.attrs);
    }
  }

}
