export class Applet {
    protected appletTag: HTMLElement;

    constructor() {
        console.log('Applet API constructor called.');
    }

    setAppletTag(tag: HTMLElement) {
        this.appletTag = tag;
    }
}
