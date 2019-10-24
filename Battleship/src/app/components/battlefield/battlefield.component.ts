import { Component, EventEmitter, OnInit, Input, Output } from '@angular/core';
import { Cell } from 'src/app/interfaces/cell.interface';
import { Ship } from 'src/app/interfaces/ship.interface';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {

  constructor() {
    console.log('constructor');
  }

  @Input () isEnemy:boolean;

  @Input () field:Array<Array<Cell>>;
  @Input () ships:Array<Ship>;

  @Output() nextShooter: EventEmitter<any> = new EventEmitter<any>();
  private thisShooter = true;

  defitedStatus = false;

  ngOnInit() {
    console.log('init');
  }

  onFire (coordX:number, coordY:number) {
    // start if
    if (this.isEnemy
      &&
      !this.field[coordX][coordY].cellStatus
      &&
      !this.defitedStatus
    ) {
      if (this.field[coordX][coordY].isShip) {
        this.field[coordX][coordY].cellStatus = 'hit'
        let ship = this.ships.find((ship) => ship.id == this.field[coordX][coordY].idShip);
        ship.hits++;
        if (ship.hits == ship.size) {
          ship.isSunk = true;
          ship.coords.forEach((cell) => this.setMissCellStatusAround(cell))
        }
      } else {
        this.field[coordX][coordY].cellStatus = 'miss';
      }
    }
    // end if
    this.nextShooter.emit(true);

    if (this.ships.every(ship => ship.isSunk) && !this.defitedStatus) {
      alert('game over');
      this.defitedStatus = true
    }
  }

  private setMissCellStatusAround (coords:Cell) {
    for (let i = 0; i < 3; i++) {
      try {
        if (!this.field[coords.coordX-1][coords.coordY-1+i].isShip) {
          this.field[coords.coordX-1] [coords.coordY-1+i].cellStatus = 'miss';
        }
      } catch {}
      try {
        if (!this.field[coords.coordX][coords.coordY-1+i].isShip) {
          this.field[coords.coordX]   [coords.coordY-1+i].cellStatus = 'miss';
        }
      } catch {}
      try {
        if (!this.field[coords.coordX+1][coords.coordY-1+i].isShip) {
          this.field[coords.coordX+1] [coords.coordY-1+i].cellStatus = 'miss';
        }
      } catch {}
    }
  }
}
