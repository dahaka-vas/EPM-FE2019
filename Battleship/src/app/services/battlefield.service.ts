import { Injectable } from '@angular/core';
import { Cell } from 'src/app/interfaces/cell.interface';
import { Ship } from 'src/app/interfaces/ship.interface';

@Injectable({
  providedIn: 'root'
})
export class BattlefieldService {

  constructor() { }

  fieldSize:number;

  getField (ships:Array<Ship>) {
    let field:Array<Array<Cell>> = [];

    for (let coordX = 0; coordX < this.fieldSize; coordX++) {
      let rows:Array<Cell> = [];
      for (let coordY = 0; coordY < this.fieldSize; coordY++) {
        let isShip:boolean = false;
        let idShip:string = '';
        rows.push({coordX, coordY, isShip, idShip});
      }
      field.push(rows);
    }

    ships.forEach((ship:Ship) => {
      ship.coords.forEach((shipCell:Cell) => {
        let fieldCell = field[shipCell.coordX][shipCell.coordY];
        if (shipCell.coordX == fieldCell.coordX && shipCell.coordY == fieldCell.coordY) {
          fieldCell.isShip = true;
          fieldCell.idShip = ship.id;
        }
      })
    })

    return field;
  }
}