import { Component, OnInit, Renderer } from '@angular/core';
import { Applet, appletsGenericTemplate } from './applet';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'applet-sort',
  template: appletsGenericTemplate + `
<ng-template #childToolbar>
  <a *ngIf="!doTicks && !allDone" (click)="doTicks = true">Play</a>
  <a *ngIf="doTicks && !allDone" (click)="doTicks = false">Pause</a>
  <a *ngIf="!doTicks && !allDone" (click)="doTick()">Next Frame</a>
  <a *ngIf="!doTicks || allDone" (click)="doReset()">Reset</a>
  <a *ngIf="doTicks && !allDone && rr < maxRR" (click)="doSpeedDown()">&lt;&lt; Speed</a>
  <a *ngIf="doTicks && !allDone && rr > minRR" (click)="doSpeedUp()">Speed &gt;&gt;</a>
</ng-template>
  `,
  styleUrls: ['./applet.scss']
})
export class AppletSortComponent extends Applet implements OnInit {
  private doTicks;
  private allDone;
  private rr;
  private readonly maxRR = 91;
  private readonly minRR = 5;
  private method;
  private accumulator;
  private numBars;
  private bars: Bar[];
  private i;
  private j;
  private focused: number[];

  constructor(protected platform: Platform, protected renderer: Renderer) {
    super(platform, renderer, true);
  }

  ngOnInit() {
    super.ngOnInit();
    this.method = this.appletTag.getAttribute('data-method');
    if (!this.method) {
      this.method = 'bubble';
    }
    this.numBars = this.appletTag.getAttribute('data-num-bars');
    if (!this.numBars) {
      this.numBars = 10;
    }
    if (this.numBars < 10) {
      this.numBars = 10;
    }
    if (this.numBars > 100) {
      this.numBars = 100;
    }
    this.doReset();
  }

  // Credit: https://stackoverflow.com/a/6274381
  protected doShuffle() {
    let j, x, i;
    for (i = this.bars.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this.bars[i];
      this.bars[i] = this.bars[j];
      this.bars[j] = x;
    }
  }

  doSpeedDown() {
    if (this.rr < this.maxRR) {
      this.rr += 5;
    }
  }

  doSpeedUp() {
    if (this.rr > this.minRR) {
      this.rr -= 5;
    }
  }

  doReset() {
    this.bars = new Array<Bar>();
    for (let i = 0; i < this.numBars; ++i) {
      this.bars.push({
        index: i
      });
    }
    this.doShuffle();
    this.doTicks = false;
    this.allDone = false;
    this.rr = 21;
    this.accumulator = 0;
    this.i = 0;
    this.j = 0;
    this.focused = [];
  }

  doTick() {
    if (this.allDone) {
      return;
    }
    switch (this.method) {
      default:
      case 'bubble':
        this.bubbleSort();
        break;
    }
  }

  protected draw() {
    super.draw();
    this.accumulator++
    if (this.accumulator >= this.rr) {
      this.accumulator = 0;
      if (this.doTicks) {
        this.doTick();
      }
    }
    let barWidth = this.canvas.width / this.numBars;
    let barHeight = this.canvas.height * 0.9;
    for (let i = 0; i < this.numBars; ++i) {
      if (i == this.bars[i].index) {
        this.ctx.fillStyle = '#666666';
      } else {
        this.ctx.fillStyle = '#333333';
      }
      if (this.focused.find(index => {return index == i;})) {
        this.ctx.fillStyle = '#0000CC';
      }
      let height = (this.bars[i].index + 1) / this.numBars * barHeight;
      this.ctx.fillRect(i * barWidth, this.canvas.height - height, barWidth, height);
    }
  }

  protected bubbleSort() {
    this.focused = [+this.j, +this.j + 1];
    if (this.bars[this.j].index > this.bars[this.j + 1].index) {
      // Swap j and j + 1
      let temp = this.bars[this.j + 1];
      this.bars[this.j + 1] = this.bars[this.j];
      this.bars[this.j] = temp;
    }
    this.j++;
    if (this.j >= this.numBars - this.i - 1) {
      this.j = 0;
      this.i++;
      if (this.i >= this.numBars - 1) {
        this.allDone = true;
      }
    }
    if (this.i >= this.numBars - 1) {
      this.focused = [];
      this.allDone = true;
      return;
    }
  }
}

interface Bar {
  index: number;
}