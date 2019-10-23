import { Component, OnInit } from '@angular/core';

import { BattlefieldService } from 'src/app/services/battlefield.service';
import { ShipsService } from 'src/app/services/ships.service';

import { Cell } from 'src/app/interfaces/cell.interface';
import { Ship } from 'src/app/interfaces/ship.interface';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  constructor(
    private battlefieldService: BattlefieldService,
    private shipsService: ShipsService
  ) {}

  private player: {field:Array<Array<Cell>>, ships:Array<Ship>} = {field: [], ships: []};
  private enemy: {field:Array<Array<Cell>>, ships:Array<Ship>} = {field: [], ships: []};

  readyToPlay = false;
  // shipsData:ShipsData;

  ngOnInit() {
    this.player.field = this.battlefieldService.getField(this.player.ships);
    this.enemy.ships = this.shipsService.getShips();
    this.enemy.field = this.battlefieldService.getField(this.enemy.ships);

    console.log(this);
  }

  onClick() {
  }

  autoShips({ships, field}){
    this.player.ships = ships;
    this.player.field = field;
  }

  start (status:boolean) {
    this.readyToPlay = status
  }
}
