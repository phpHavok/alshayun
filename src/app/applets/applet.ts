import { ViewChild, ElementRef, Renderer, AfterViewInit } from "@angular/core";
import { Platform } from "@ionic/angular";

export class Applet implements AfterViewInit {
    @ViewChild('canvas') canvasRef: ElementRef;
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected appletTag: HTMLElement;

    constructor(protected platform: Platform, protected renderer: Renderer, private animated: boolean) {
        console.log('Applet API constructor called.');
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
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
        this.ctx.fillStyle = '#EEEEEE';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    protected draw() {
        this.clear();
    }
}
