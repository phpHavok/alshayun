import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ArticlesService } from '../services/articles.service';
import { ToastController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  @ViewChild('settingsForm') settingsForm: NgForm;

  constructor(private as: ArticlesService, private toastCtrl: ToastController, private loadingCtrl: LoadingController) { }

  async loadSettings() {
    const loading = await this.loadingCtrl.create({
      message: 'Loading settings...'
    });
    await loading.present();
    this.settingsForm.controls['articlesURL'].setValue(await this.as.getUrlPrefix());
    return await loading.dismiss();
  }

  ngOnInit() {
    this.loadSettings();
  }

  updateSettings(form: NgForm) {
    this.as.setUrlPrefix(form.controls['articlesURL'].value).then(_ => {
      this.toastCtrl.create({
        duration: 3000,
        message: 'Settings saved successfully.',
        position: 'bottom'
      }).then(toast => {
        toast.present();
      });
    });
  }

}
