import { Injectable } from '@angular/core';

import { Cell } from 'src/app/interfaces/cell.interface';
import { Ship } from 'src/app/interfaces/ship.interface';
import { ShipsData } from 'src/app/interfaces/shipsData.interface';


@Injectable({
  providedIn: 'root'
})
export class ShipsService {

  constructor () { }

  // shipsData:ShipsData = {
  //   fourDeckShips: {
  //     number: 1,
  //     size: 4,
  //     type: 'fourDeckShips'
  //   },
  //   threeDeckShips: {
  //     number: 2,
  //     size: 3,
  //     type: 'threeDeckShips'
  //   },
  //   twoDeckShips: {
  //     number: 3,
  //     size: 2,
  //     type: 'twoDeckShips'
  //   },
  //   oneDeckShips: {
  //     number: 4,
  //     size: 1,
  //     type: 'oneDeckShips'
  //   }
  // }

  shipsData:Array<ShipsData>;
  fieldSize:number;

  private getRandom (min:number, max:number):number {
    return Math.round (Math.random() * (max - min)) + min;
  }

  generateShips ():Array<Ship> {
    let occupiedCells = new Array(this.fieldSize).fill(null).map(() => {
      return new Array(this.fieldSize).fill(false)
    });

    const oneTypeShips = (type:string, num:number, size:number) => {
      return new Array(num).fill(type).map((type, index) => {

        let coords:Array<Cell> = [];
        let coordX:number, coordY:number;

        let directionX: number = this.getRandom(0, 1);       // 0 = horizontal, 1 = vertical
        let directionY: number = directionX ? 0 : 1;         // 0 = vertical, 1 = horizontal

        const isOccupied = (_coordX:number, _coordY:number) => {
            for (let i = 0; i < size; i++) {
              if (occupiedCells[_coordX + (i*directionX)][_coordY + (i*directionY)]) return true
            }
          return false;
        }

        do {
          let maxCoordX = this.fieldSize - 1 - (size-1)*directionX;
          let maxCoordY = this.fieldSize - 1 - (size-1)*directionY;
          coordX = this.getRandom(0, maxCoordX);
          coordY = this.getRandom(0, maxCoordY);
        } while (isOccupied (coordX, coordY))

        const occupingCells = (_coords:Cell) => {
          for (let i = 0; i < 3; i++) {
            try { occupiedCells[_coords.coordX-1] [_coords.coordY-1+i] = true } catch {}
            try { occupiedCells[_coords.coordX]   [_coords.coordY-1+i] = true } catch {}
            try { occupiedCells[_coords.coordX+1] [_coords.coordY-1+i] = true } catch {}
          }
        }

        for (let i = 0; i < size; i++) {
          coords.push({coordX: coordX + (i*directionX), coordY: coordY + (i*directionY)});
          occupingCells(coords[i]);
        }

        return {
          id: type + '-' + (++index),
          coords,
          type,
          size,
          hits: 0,
          isSunk: false
        }
      });
    };

    let ships:Array<Ship> = []
    for (let ship in this.shipsData) {
      ships = [
        ...ships,
        ...(oneTypeShips(this.shipsData[ship].type, this.shipsData[ship].number, this.shipsData[ship].size))
      ]
    }

    return ships
  }
}