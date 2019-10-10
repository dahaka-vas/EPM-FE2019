import { Component, OnInit } from '@angular/core';
import { PreparingToGameService } from 'src/app/services/preparing-to-game.service';

@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  constructor(private preparingService: PreparingToGameService) { }

  ngOnInit() {
  }
}
