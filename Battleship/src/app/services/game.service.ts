import { Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

import { Cell } from 'src/app/interfaces/cell.interface';
import { Ship } from 'src/app/interfaces/ship.interface';
import { ShipsData } from 'src/app/interfaces/shipsData.interface';

import { BattlefieldService } from './battlefield.service';
import { ShipsService } from './ships.service';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(
    private httpService: HttpService,
    private battlefieldService: BattlefieldService,
    private shipsService: ShipsService
  ) {
    this.httpService.getShipsData().subscribe((data: {fieldSize:number, shipsData:Array<ShipsData>}) => {
      this.shipsService.fieldSize = data.fieldSize;
      this.shipsService.shipsData = data.shipsData;
      this.battlefieldService.fieldSize = data.fieldSize;
      this.gameInit();
    })
    this.httpService.getAdvicesData().subscribe((data:{preGameAdvices?:Array<any>, gameAdvices?:Array<any>}) => {
      this.advices = data
    })
  }

  advices: {preGameAdvices?:Array<any>, gameAdvices?:Array<any>} = {preGameAdvices: [], gameAdvices: []};

  player:{field:Array<Array<Cell>>, ships:Array<Ship>, username?:string} = {field:[], ships:[], username:'player'};
  enemy:{field:Array<Array<Cell>>, ships:Array<Ship>, username?:string} = {field:[], ships:[], username:'computer'};
  playerIsShooter:boolean;

  readyToPlay = false;
  gameOn = false;
  gameOver = false;
  winner:string;
  message:Array<string>;


  gameInit () {
    this.winner = '';
    this.message = [];
    this.readyToPlay = false;
    this.gameOn = false;
    this.gameOver = false;
    this.player.ships = [];
    this.player.field = this.battlefieldService.getField(this.player.ships);
    this.enemy.ships = this.shipsService.generateShips();
    this.enemy.field = this.battlefieldService.getField(this.enemy.ships);
    this.playerIsShooter = Math.round(Math.random()) ? true : false
    this.setEnemyCoords();
  }


  private getRandom (min:number, max:number):number {
    return Math.round (Math.random() * (max - min)) + min;
  }


  game () {
    if (!this.playerIsShooter) {
      this.message.unshift(`Computer shoots first`)
      this.enemyOnFire();
    } else {
      this.message.unshift(`Player shoots first`)
    }
  }


  private enemyCoords:Array<Cell> = [];
  private setEnemyCoords () {
    for (let i = 0; i < this.battlefieldService.fieldSize; i++) {
      for (let j = 0; j < this.battlefieldService.fieldSize; j++) {
        this.enemyCoords.push({coordX: i, coordY: j})
      }
    }
  }


  enemyOnFire () {
    this.message.unshift('-')

    let enemyOnFire$ = interval(600).pipe().subscribe(() => {
      // let whileCounter = 0;
      // while (!this.playerIsShooter && whileCounter++ < 10 && this.enemyCoords.length) {
        let coordI = this.getRandom(0, this.enemyCoords.length-1);
        let coords = this.enemyCoords.splice(coordI, 1)[0]
        this.onFire(coords.coordX, coords.coordY, 'player', 'enemy')
      // }

      if (this.playerIsShooter) {
        enemyOnFire$.unsubscribe();
        // console.log('unsubscribe');
      }

      if (!this.enemyCoords.length) {
        enemyOnFire$.unsubscribe();
        // console.log('unsubscribe');
      }

      // if (whileCounter > 10) {
      //   this.message.unshift(`ошибочка вышла, твоя очередь стрелять`)
      //   this.playerIsShooter = true
      // }
    })
  }


  onFire (coordX:number, coordY:number, target:string, shooter:string) {
    let firedCell = this[target].field[coordX][coordY]

    // start if
    if (!firedCell.cellStatus && !this.gameOver) {
      if (firedCell.isShip) {
        firedCell.cellStatus = 'hit'
        let ship = this[target].ships.find((ship:Ship) => ship.id == firedCell.idShip);
        ship.hits++;
        if (ship.hits == ship.size) {
          ship.isSunk = true;
          this.message.unshift(`${this[shooter].username} sank a ${this[target].username}'s ship on x: ${coordX+1} y: ${coordY+1}`)
          ship.coords.forEach((cell:Cell) => this.setMissCellStatusAround(cell, target))
        } else {
          this.message.unshift(`${this[shooter].username} shot ${this[target].username} on x: ${coordX+1} y: ${coordY+1}`)
        }
      } else {
        firedCell.cellStatus = 'miss';
        this.message.unshift(`${this[shooter].username} missed ${this[target].username} on x: ${coordX+1} y: ${coordY+1}`)

        this.playerIsShooter = !this.playerIsShooter;
      }
    }
    // end if

    if (this[target].ships.every((ship:Ship) => ship.isSunk) && !this.gameOver) {
      this.winner = this[shooter].username
      this.message.unshift('Click on NEW GAME button to start a new game ->', '-', this.winner + ' is winner', '-', '** Game over **', '-', '-');
      this.gameOver = true
    }
  }


  private setMissCellStatusAround (coords:Cell, target:string) {
    for (let i = 0; i < 3; i++) {
      try {
        if (!this[target].field[coords.coordX-1][coords.coordY-1+i].isShip) {
          this[target].field[coords.coordX-1] [coords.coordY-1+i].cellStatus = 'miss';
        }
      } catch {}
      try {
        if (!this[target].field[coords.coordX][coords.coordY-1+i].isShip) {
          this[target].field[coords.coordX]   [coords.coordY-1+i].cellStatus = 'miss';
        }
      } catch {}
      try {
        if (!this[target].field[coords.coordX+1][coords.coordY-1+i].isShip) {
          this[target].field[coords.coordX+1] [coords.coordY-1+i].cellStatus = 'miss';
        }
      } catch {}
    }
  }
}
