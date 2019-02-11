import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppletExampleComponent } from './applet-example.component';

describe('AppletExampleComponent', () => {
  let component: AppletExampleComponent;
  let fixture: ComponentFixture<AppletExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppletExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppletExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
