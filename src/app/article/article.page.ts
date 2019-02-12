import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked, ComponentFactoryResolver, Injector, ApplicationRef, EmbeddedViewRef, Renderer } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Article, ArticleAttributes, ArticlesService } from '../services/articles.service'
import { LoadingController, IonContent } from '@ionic/angular';
import { MarkdownService } from 'ngx-markdown';
import { DomSanitizer } from '@angular/platform-browser';
import { AppletExampleComponent } from '../applets/applet-example.component';
import { Applet } from '../applets/applet';

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
  @ViewChild('header', {read: ElementRef}) header: ElementRef;
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
              private renderer: Renderer) { }

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
    let component = null;
    switch (applet.getAttribute('name')) {
      case 'example':
        component = AppletExampleComponent;
        break;
      default:
        return null;
    }
    const componentRef = this.cfr.resolveComponentFactory(component).create(this.injector);
    (componentRef.instance as Applet).setAppletTag(applet);
    (componentRef.instance as Applet).fullscreen.subscribe(fullscreen => {
      this.processScrolls = !fullscreen;
      this.renderer.setElementClass(this.header.nativeElement, 'hidden', fullscreen);
      if (this.processScrolls) {
        this.content.scrollToPoint(0, Math.max(this.attrs.readPos, 0));
      }
    });
    componentRef.changeDetectorRef.detectChanges();
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
