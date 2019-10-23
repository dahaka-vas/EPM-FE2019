import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule }   from '@angular/common/http';

import { AppComponent } from './app.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { BattlefieldComponent } from './components/battlefield/battlefield.component';
// import { SettingsfieldComponent } from './components/settingsfield/settingsfield.component';
// import { ShipsComponent } from './components/ships/ships.component';
// import { CellComponent } from './components/cell/cell.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    BattlefieldComponent,
    // SettingsfieldComponent,
    // ShipsComponent,
    // CellComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
