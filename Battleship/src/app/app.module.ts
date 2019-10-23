import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { BattlefieldComponent } from './components/battlefield/battlefield.component';
import { RulesComponent } from './components/rules/rules.component';
import { SettingsfieldComponent } from './components/settingsfield/settingsfield.component';
// import { ShipsComponent } from './components/ships/ships.component';
// import { CellComponent } from './components/cell/cell.component';

const appRoutes: Routes = [
  {path: 'rules', component: RulesComponent},
  {path: '', component: PlaygroundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    BattlefieldComponent,
    RulesComponent,
    SettingsfieldComponent,
    // ShipsComponent,
    // CellComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
