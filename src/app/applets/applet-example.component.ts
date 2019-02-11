import { Component, OnInit } from '@angular/core';
import { Applet } from './applet';

@Component({
  selector: 'applet-example',
  templateUrl: './applet.html',
  styleUrls: ['./applet.scss']
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
