import { Injectable, Injector, ComponentFactoryResolver, ApplicationRef, EmbeddedViewRef } from '@angular/core';
import { AppletExampleComponent } from '../applets/applet-example.component';
import { Applet } from '../applets/applet';

@Injectable({
  providedIn: 'root'
})
export class AppletsService {

  constructor() { }

  createApplet(applet: HTMLElement, cfr: ComponentFactoryResolver, injector: Injector, appRef: ApplicationRef, onFullscreen?): HTMLElement {
    let component = null;
    switch (applet.getAttribute('name')) {
      case 'example':
        component = AppletExampleComponent;
        break;
      default:
        return null;
    }
    const componentRef = cfr.resolveComponentFactory(component).create(injector);
    (componentRef.instance as Applet).setAppletTag(applet);
    if (onFullscreen) {
      (componentRef.instance as Applet).fullscreen.subscribe(onFullscreen);
    }
    componentRef.changeDetectorRef.detectChanges();
    appRef.attachView(componentRef.hostView);
    let element = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    return element;
  }
}
