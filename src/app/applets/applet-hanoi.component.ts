import { Component, OnInit, AfterViewInit, Renderer } from '@angular/core';
import { Applet } from './applet';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'applet-hanoi',
  templateUrl: './applet.html',
  styleUrls: ['./applet.scss']
})
export class AppletHanoiComponent extends Applet implements OnInit, AfterViewInit {
  private numRings;
  private discWidth;
  private rings = [
    [] as Ring[], [] as Ring[], [] as Ring[]
  ];
  private palette = [
    ['#BF0600', '#FF0800'],
    ['#BF00BE', '#FF00FD'],
    ['#10BF00', '#15FF00'],
    ['#BF9C00', '#FFD000'],
    ['#00BFAF', '#00FFE9'],
    ['#BF5700', '#FF7400']
  ];

  constructor(protected platform: Platform, protected renderer: Renderer) {
    super(platform, renderer, true);
  }

  ngOnInit() {
    super.ngOnInit();
    this.numRings = this.appletTag.getAttribute('data-num-rings');
    if (!this.numRings || this.numRings < 3) {
      this.numRings = 3;
    }
    if (this.numRings > 8) {
      this.numRings = 8;
    }
    let scaleXStart = 1.0;
    let scaleYStart = 1.0;
    for (let i = 0; i < this.numRings; ++i) {
      this.rings[0].push({
        colorDark: this.palette[i % this.palette.length][0],
        colorLight: this.palette[i % this.palette.length][1],
        scaleX: scaleXStart * 0.9,
        scaleY: scaleYStart * 0.98,
        index: i
      });
      scaleXStart *= 0.9;
      scaleYStart *= 0.98;
    }
  }

  ngAfterViewInit() {
    super.ngAfterViewInit();
  }

  protected draw() {
    super.draw();
    if (this.canvas.width < this.canvas.height) {
      // Portrait
      this.discWidth = this.canvas.width / 4;
      for (let i = 0; i < 3; ++i) {
        this.drawSpindle(this.canvas.width / 2, this.canvas.height / 3 * (i + 1) + this.discWidth * 0.3 - this.canvas.height / 6, i);
      }
    } else {
      // Landscape
      this.discWidth = this.canvas.width / 4;
      for (let i = 0; i < 3; ++i) {
        this.drawSpindle(this.canvas.width / 3 * (i + 1) - this.canvas.width / 6, this.canvas.height / 2 + this.discWidth * 0.15, i);
      }
    }
  }

  protected drawDisc(x, y, w, h, colorDark, colorLight) {
    // Bottom of base
    this.ctx.beginPath();
    this.ctx.fillStyle = colorDark;
    this.ctx.ellipse(x, y + h, w / 2, h / 2, 0, 0, 2 * Math.PI, false);
    this.ctx.fill();
    // Base rectangle
    this.ctx.fillStyle = colorDark;
    this.ctx.fillRect(x - w / 2, y, w, h);
    // Top of base
    this.ctx.beginPath();
    this.ctx.fillStyle = colorLight;
    this.ctx.ellipse(x, y, w / 2, h / 2, 0, 0, 2 * Math.PI, false);
    this.ctx.fill();
  }

  protected drawSpindle(x, y, index) {
    // Disc
    this.drawDisc(x, y, this.discWidth, this.discWidth * 0.15, '#333333', '#666666');
    // Spindle
    let spindleWidth = this.discWidth * 0.075;
    let spindleHeight = this.discWidth;
    this.ctx.fillStyle = '#333333';
    this.ctx.fillRect(x - spindleWidth / 2, y - spindleHeight, spindleWidth, spindleHeight);
    // Rings
    for (let i = 0; i < this.rings[index].length; ++i) {
      let ring = this.rings[index][i];
      let ringHeight = this.discWidth * 0.1;
      this.drawDisc(x, y - ringHeight * (i + 1), this.discWidth * ring.scaleX, ringHeight * ring.scaleY, ring.colorDark, ring.colorLight);
      // Spindle top
      if (i + 1 == this.rings[index].length) {
        this.ctx.fillStyle = '#333333';
        this.ctx.fillRect(x - spindleWidth / 2, y - ringHeight * (i + 2), spindleWidth, ringHeight);
      }
    }
  }
}

interface Ring {
  scaleX: number,
  scaleY: number,
  colorDark: string,
  colorLight: string,
  index: number
}
