import { Component, OnInit, Input } from '@angular/core';
import { Cell } from 'src/app/interfaces/cell.interface';
import { Ship } from 'src/app/interfaces/ship.interface';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {

  constructor() { }

  @Input () isEnemy:boolean;

  @Input () field:Array<Array<Cell>>;
  @Input () ships:Array<Ship>;

  defitedStatus = false;

  ngOnInit() {
    //  console.log(this);
  }

  onFire (coordX, coordY) {

    if (this.isEnemy && !this.field[coordX][coordY].cellStatus && !this.defitedStatus) { // start if
      // console.log('fire');
      

    if (this.field[coordX][coordY].isShip) {
      this.field[coordX][coordY].cellStatus = 'hit'

      let ship = this.ships.find((ship) => ship.id == this.field[coordX][coordY].idShip);

      ship.hits++;
      // console.log(ship.hits);
      

      if (ship.hits == ship.size) {
      
      ship.isSunk = true;
      ship.coords.forEach((cell) => {
          const occupingCells = (_coords) => {
            for (let i = 0; i < 3; i++) {
              try {
                if (!this.field[_coords.coordX-1][_coords.coordY-1+i].isShip) {
                  this.field[_coords.coordX-1] [_coords.coordY-1+i].cellStatus = 'miss';
                }
              } catch {}
              try {
                if (!this.field[_coords.coordX][_coords.coordY-1+i].isShip) {
                  this.field[_coords.coordX]   [_coords.coordY-1+i].cellStatus = 'miss';
                }
              } catch {}
              try {
                if (!this.field[_coords.coordX+1][_coords.coordY-1+i].isShip) {
                  this.field[_coords.coordX+1] [_coords.coordY-1+i].cellStatus = 'miss';
                }
              } catch {}
            }
          }
          occupingCells(cell);
          
        })
      // })
      }


    } else {
      this.field[coordX][coordY].cellStatus = 'miss';
    }


    }  // end if


    if (this.defitedStatus) {
      
    }


    if (this.ships.every(ship => ship.isSunk) && !this.defitedStatus) {
      alert('game over');
      this.defitedStatus = true
    }
  }
}
