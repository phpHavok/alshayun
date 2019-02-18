import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { toUnicode } from 'punycode';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  @ViewChild('articleForm') articleForm: NgForm;
  private id = null;

  constructor(private activatedRoute: ActivatedRoute, private as: ArticleService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      this.id = +params.get('id');
      this.as.getArticle(this.id).then(article => {
        this.articleForm.controls['title'].setValue(article.title);
        this.articleForm.controls['tags'].setValue(article.tags.join());
        this.articleForm.controls['excerpt'].setValue(article.excerpt);
        this.articleForm.controls['text'].setValue(article.text);
      });
    });
  }

  deleteArticle() {
    this.as.deleteArticle(this.id);
    this.router.navigate(['/']);
  }

  updateArticle() {
    let article = {
      id: this.id,
      title: this.articleForm.controls['title'].value,
      tags: this.articleForm.controls['tags'].value.split(','),
      excerpt: this.articleForm.controls['excerpt'].value,
      text: this.articleForm.controls['text'].value
    };
    this.as.updateArticle(article);
  }

}
