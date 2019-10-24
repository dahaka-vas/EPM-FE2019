import { Component, OnInit } from '@angular/core';

import { BattlefieldService } from 'src/app/services/battlefield.service';
import { ShipsService } from 'src/app/services/ships.service';

import { Cell } from 'src/app/interfaces/cell.interface';
import { Ship } from 'src/app/interfaces/ship.interface';

import { HttpClient} from '@angular/common/http';
import { ShipsData } from 'src/app/interfaces/shipsData.interface';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  constructor(
    private battlefieldService: BattlefieldService,
    private shipsService: ShipsService,
    private http: HttpClient
  ) {}

  private player: {field:Array<Array<Cell>>, ships:Array<Ship>} = {field: [], ships: []};
  private enemy: {field:Array<Array<Cell>>, ships:Array<Ship>} = {field: [], ships: []};

  readyToPlay = false;

  ngOnInit() {
    // this.player.field = this.battlefieldService.getField(this.player.ships);
    // this.enemy.ships = this.shipsService.getShips();
    // this.enemy.field = this.battlefieldService.getField(this.enemy.ships);

    console.log(this);

    this.http.get('/assets/configs.json').subscribe((data: {fieldSize:number, shipsData:Array<ShipsData>}) => {
      this.shipsService.fieldSize = data.fieldSize;
      this.shipsService.shipsData = data.shipsData;
      this.battlefieldService.fieldSize = data.fieldSize;

      this.player.field = this.battlefieldService.getField(this.player.ships);
      this.enemy.ships = this.shipsService.ships;
      this.enemy.field = this.battlefieldService.getField(this.enemy.ships);
    })
  }

  autoShips(ships:Array<Ship>):void {
    this.player.ships = ships;
    this.player.field = this.battlefieldService.getField(this.player.ships);
    // this.player.field = field;
  }

  start (status:boolean):void {
    // this.enemy.ships = this.shipsService.getShips();
    // this.enemy.field = this.battlefieldService.getField(this.enemy.ships);
    this.readyToPlay = status
  }

  nextShooter(next:boolean):void {
    console.log(next);
  }
}
