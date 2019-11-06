import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }

  username = this.gameService.player.username;
  email;

  ngOnInit() {
  }

  login () {
    if (this.gameService.player.username || this.username) {
      this.gameService.player.username = this.username
      this.gameService.gameInit();
    }
    this.router.navigate(['/game']);
  }

}
