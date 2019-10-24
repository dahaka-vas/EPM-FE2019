import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { ShipsService } from 'src/app/services/ships.service';

@Component({
  selector: 'app-settingsfield',
  templateUrl: './settingsfield.component.html',
  styleUrls: [
    './settingsfield.component.scss',
    './buttons.animation.scss'
  ]
})
export class SettingsfieldComponent implements OnInit {

  constructor( private shipsService: ShipsService ) {}

  @Input() readyToPlay:boolean;
  @Output() start: EventEmitter<any> = new EventEmitter<any>()
  @Output() autoShips: EventEmitter<any> = new EventEmitter<any>()

  ngOnInit() { }

  onAuto() {
    let ships = this.shipsService.ships;
    this.autoShips.emit(ships);
    this.readyToPlay = true;
  }

  onSpace() {
    console.log('space');
  }

  onPlay() {
    this.start.emit(true);
  }
}