import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PlaygroundComponent } from './components/playground/playground.component';
import { BattlefieldComponent } from './components/battlefield/battlefield.component';
import { RulesComponent } from './components/rules/rules.component';
import { SettingsfieldComponent } from './components/settingsfield/settingsfield.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveLoginComponent } from './components/reactive-login/reactive-login.component';
// import { CellComponent } from './components/cell/cell.component';
// import { ShipsComponent } from './components/ships/ships.component';

import { GameGuard } from './guards/game.guard';

const appRoutes: Routes = [
  {path: 'rules', component: RulesComponent},
  {path: 'login', component: LoginComponent},
  {path: '', component: ReactiveLoginComponent},
  {path: 'game', component: PlaygroundComponent, canActivate: [GameGuard]}
]

@NgModule({
  declarations: [
    AppComponent,
    PlaygroundComponent,
    BattlefieldComponent,
    RulesComponent,
    SettingsfieldComponent,
    LoginComponent,
    ReactiveLoginComponent,
    // ShipsComponent,
    // CellComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [GameGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
