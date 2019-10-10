import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreparingToGameService {

  constructor() { }

  readyToPlay:boolean = false;

  onPlay() {
    this.readyToPlay = !this.readyToPlay;
    // const settingsfield:any = document.querySelector('.settingsfield');
    // const compBattlefield:any = document.querySelector('.comp-battlefield');
    // settingsfield.style.transform = "rotateY(180deg)";
    // compBattlefield.style.transform = "rotateY(360deg)";
  }
}
