import { ViewChild, ElementRef, Renderer, AfterViewInit, Output, EventEmitter } from "@angular/core";
import { Platform } from "@ionic/angular";

export class Applet implements AfterViewInit {
    @Output('fullscreen') fullscreen = new EventEmitter();
    @ViewChild('canvas') canvasRef: ElementRef;
    protected canvas: HTMLCanvasElement;
    protected ctx: CanvasRenderingContext2D;
    protected appletTag: HTMLElement;
    private isFullscreen: boolean;

    constructor(protected platform: Platform, protected renderer: Renderer, private animated: boolean) {
        console.log('Applet API constructor called.');
        this.isFullscreen = false;
    }

    ngAfterViewInit() {
        this.canvas = this.canvasRef.nativeElement as HTMLCanvasElement;
        this.ctx = this.canvas.getContext('2d');
        this.resize();
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
}
