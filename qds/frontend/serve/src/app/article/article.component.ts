import { Component, OnInit, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { MarkdownService } from 'ngx-markdown';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @ViewChild('articleForm') articleForm: NgForm;
  @ViewChild('saveStatus') saveStatus: ElementRef;
  private id = null;
  private parsedText = '';

  constructor(private activatedRoute: ActivatedRoute,
              private as: ArticleService,
              private router: Router,
              private renderer: Renderer,
              private markdown: MarkdownService,
              private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
      if (this.id) {
        this.as.getArticle(this.id).then(article => {
          this.articleForm.controls['title'].setValue(article.title);
          this.articleForm.controls['tags'].setValue(article.tags.join());
          this.articleForm.controls['excerpt'].setValue(article.excerpt);
          this.articleForm.controls['text'].setValue(article.text);
          this.updatePreview();
        });
      } else {
        this.id = null;
      }
    });
  }

  deleteArticle() {
    if (this.id) {
      this.as.deleteArticle(this.id);
      this.router.navigate(['/']);
    }
  }

  updateArticle() {
    let saveStatus = this.saveStatus.nativeElement as HTMLElement;
    saveStatus.innerText = 'Saving...';
    this.renderer.setElementClass(saveStatus, 'hidden', false);
    let article = {
      id: this.id,
      title: this.articleForm.controls['title'].value,
      tags: this.articleForm.controls['tags'].value.split(','),
      excerpt: this.articleForm.controls['excerpt'].value,
      text: this.articleForm.controls['text'].value
    };
    this.as.updateArticle(article).subscribe(response => {
      if (!this.id) {
        this.id = response.id;
      }
      saveStatus.innerText = 'Saved!';
      this.renderer.setElementClass(saveStatus, 'hidden', true);
    });
  }

  updatePreview() {
    this.parsedText = this.markdown.compile(this.articleForm.controls['text'].value);
  }

}
