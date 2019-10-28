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
    let cols:Array<Array<Cell>> = [];
    for (let i = 0; i < this.fieldSize; i++) {
      let rows:Array<Cell> = [];

      for (let j = 0; j < this.fieldSize; j++) {
        let coordX: number = i;
        let coordY: number = j;
        let isShip:boolean = false;
        let idShip:string = '';

        ships.forEach((ship:Ship) => {
          ship.coords.forEach((cell:Cell) => {
            if (cell.coordX == coordX && cell.coordY == coordY) {
              isShip = true;
              idShip = ship.id;
            }
          })
        })

        rows.push({
          coordX,
          coordY,
          isShip,
          idShip
        });
      }

      cols.push(rows);
    }
    return cols;
  }
}