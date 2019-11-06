import { Cell } from './cell.interface';
import { Ship } from './ship.interface';
export interface Player {
    id:number,
    field:Array<Array<Cell>>,
    ships:Array<Ship>,
    username:string
}