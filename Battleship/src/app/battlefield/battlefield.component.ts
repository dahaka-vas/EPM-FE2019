import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battlefield',
  templateUrl: './battlefield.component.html',
  styleUrls: ['./battlefield.component.scss']
})
export class BattlefieldComponent implements OnInit {

  constructor() { }

  private sizes:number = 10;
  private cells:string[] = [];


  ngOnInit() {
    for (let i:number = 0; i < this.sizes; i++) {
      let rows:string[] = [];
      for (let j:number = 0; j < this.sizes; j++) {
        rows.push(String.fromCodePoint(i+65) + (j+1).toString());
      }
      this.cells.push(rows);
    }
  }

}
