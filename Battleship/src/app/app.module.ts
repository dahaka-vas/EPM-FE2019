import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { BattlefieldComponent } from './components/battlefield/battlefield.component';
import { SettingsfieldComponent } from './components/settingsfield/settingsfield.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    BattlefieldComponent,
    SettingsfieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
