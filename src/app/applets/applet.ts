import { ViewChild, ElementRef, Renderer, AfterViewInit, Output, EventEmitter, OnInit } from "@angular/core";
import { Platform } from "@ionic/angular";

export class Applet implements AfterViewInit, OnInit {
    @Output('fullscreen') fullscreen = new EventEmitter();
    @ViewChild('canvas') canvasRef: ElementRef;
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected appletTag: HTMLElement;
    private isFullscreen: boolean;
    protected width: string;

    constructor(protected platform: Platform, protected renderer: Renderer, private animated: boolean) {
        console.log('Applet API constructor called.');
        this.isFullscreen = false;
    }

    ngOnInit() {
        this.width = this.appletTag.getAttribute('width');
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        if (this.width) {
            this.renderer.setElementStyle(this.canvas, 'width', this.width);
        }
        this.platform.resize.subscribe(() => {
            this.resize();
        });
        if (this.animated) {
            setInterval(() => {
                this.draw();
            }, 33);
        } else {
            this.draw();
        }
    }

    setAppletTag(tag: HTMLElement) {
        this.appletTag = tag;
    }

    protected resize() {
        this.renderer.setElementAttribute(this.canvas, 'width', (this.platform.width() * 2) + '');
        this.renderer.setElementAttribute(this.canvas, 'height', (this.platform.height() * 2) + '');
    }

    protected clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    protected draw() {
        this.clear();
    }

    toggleFullscreen() {
        this.isFullscreen = !this.isFullscreen;
        this.renderer.setElementClass(this.canvas, 'fullscreen', this.isFullscreen);
        this.fullscreen.emit(this.isFullscreen);
    }

    // Source: https://gist.github.com/mjackson/5311256
    protected rgbToHsv(r, g, b) {
        r /= 255, g /= 255, b /= 255;

        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, v = max;

        let d = max - min;
        s = max == 0 ? 0 : d / max;

        if (max == min) {
            h = 0; // achromatic
        } else {
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }

            h /= 6;
        }

        return [h, s, v];
    }

    // Source: https://gist.github.com/mjackson/5311256
    protected hsvToRgb(h, s, v) {
        let r, g, b;

        let i = Math.floor(h * 6);
        let f = h * 6 - i;
        let p = v * (1 - s);
        let q = v * (1 - f * s);
        let t = v * (1 - (1 - f) * s);

        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }

        return [r * 255, g * 255, b * 255];
    }
}
