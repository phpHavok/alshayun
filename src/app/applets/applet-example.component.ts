import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { Applet } from './applet';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'applet-example',
  templateUrl: './applet.html',
  styleUrls: ['./applet.scss']
})
export class AppletExampleComponent extends Applet implements OnInit, AfterViewInit {
  private color;
  private angle;

  constructor(protected platform: Platform, protected renderer: Renderer) {
    super(platform, renderer, true);
    this.angle = 0;
  }

  ngOnInit() {
    this.color = this.appletTag.getAttribute('color');
    if (!this.color) {
      this.color = '#00FF00';
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  protected draw() {
    super.draw();
    let small_length = (this.canvas.width < this.canvas.height) ? this.canvas.width : this.canvas.height;
    let radius = small_length * 0.25;
    let delta = radius * 0.002;
    this.ctx.lineWidth = radius * 0.05;
    this.ctx.strokeStyle = this.color;
    for (let i = 0; i < 4; ++i) {
      this.ctx.beginPath();
      this.ctx.arc(this.canvas.width / 2,
                  this.canvas.height / 2,
                  radius,
                  this.angle + (Math.PI / 2) * i + delta,
                  this.angle + (Math.PI / 2) * (i + 1) - delta,
                  false);
      this.ctx.stroke();
    }
    this.angle += 0.01;
  }
}
