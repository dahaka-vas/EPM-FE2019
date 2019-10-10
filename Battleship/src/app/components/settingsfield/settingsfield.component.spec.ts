import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsfieldComponent } from './settingsfield.component';

describe('SettingsfieldComponent', () => {
  let component: SettingsfieldComponent;
  let fixture: ComponentFixture<SettingsfieldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SettingsfieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsfieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
