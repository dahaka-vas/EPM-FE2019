import { Cell } from './cell.interface';
export interface Ship {
    id:string,
    coords:Array<Cell>,
    type:string,
    size:number,
    hits:number,
    isSunk: boolean
}