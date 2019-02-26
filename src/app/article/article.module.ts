import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ArticlePage } from './article.page';
import { AppletExampleComponent } from '../applets/applet-example.component';
import { AppletHanoiComponent } from '../applets/applet-hanoi.component';
import { AppletSortComponent } from '../applets/applet-sort.component';

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
    AppletExampleComponent,
    AppletHanoiComponent,
    AppletSortComponent
  ],
  entryComponents: [
    AppletExampleComponent,
    AppletHanoiComponent,
    AppletSortComponent
  ]
})
export class ArticlePageModule {}
