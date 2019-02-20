import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { RouterModule } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './auth.service';
import { AuthGuardService } from './auth-guard.service';
import { FormsModule } from '@angular/forms';
import { ArticleService } from './article.service';
import { HttpClientModule } from '@angular/common/http';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArticlesComponent,
    ArticleComponent,
    SignInComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
      {path: '', redirectTo: '/articles', pathMatch: 'full'},
      {path: 'articles', component: ArticlesComponent, canActivate: [AuthGuardService]},
      {path: 'article/:id', component: ArticleComponent, canActivate: [AuthGuardService]},
      {path: 'article', component: ArticleComponent, canActivate: [AuthGuardService]},
      {path: 'signin', component: SignInComponent},
      {path: '**', component: NotFoundComponent}
    ]),
    NgbModule,
    FormsModule,
    HttpClientModule,
    MarkdownModule.forRoot()
  ],
  providers: [AuthService, AuthGuardService, ArticleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
