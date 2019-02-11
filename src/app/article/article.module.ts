import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ArticlePage } from './article.page';
import { AppletExampleComponent } from '../applets/applet-example/applet-example.component';

const routes: Routes = [
  {
    path: '',
    component: ArticlePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ArticlePage,
    AppletExampleComponent
  ],
  entryComponents: [
    AppletExampleComponent
  ]
})
export class ArticlePageModule {}
