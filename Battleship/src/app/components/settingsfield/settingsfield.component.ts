import { Component, OnInit } from '@angular/core';
import { PreparingToGameService } from 'src/app/services/preparing-to-game.service';

@Component({
  selector: 'app-settingsfield',
  templateUrl: './settingsfield.component.html',
  styleUrls: ['./settingsfield.component.scss']
})
export class SettingsfieldComponent implements OnInit {

  constructor(private preparingService: PreparingToGameService) { }

  ngOnInit() {
  }

}
