import { Component, OnInit } from '@angular/core';
import { Applet } from '../applet';

@Component({
  selector: 'app-applet-example',
  templateUrl: './applet-example.component.html',
  styleUrls: ['./applet-example.component.scss']
})
export class AppletExampleComponent extends Applet implements OnInit {
  private color;

  constructor() {
    super();
  }

  ngOnInit() {
    this.color = this.appletTag.getAttribute('color');
    if (!this.color) {
      this.color = '#00FF00';
    }
  }

}
