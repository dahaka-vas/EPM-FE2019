import { Component } from '@angular/core';
import { timer } from 'rxjs';
import { GameService } from 'src/app/services/game.service';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent {

  advice;
  currentAdviceIndex:number = 0;

  advice$ = timer(1e3, 15e3).subscribe(num => {
    // if (num % 2) {
      let generateAdvice = (adviceType)  => {
        let getIndex = () => Math.round(Math.random() * ((num % this.gameService.advices[adviceType].length) || 1))
        let index = getIndex();

        let whileCounter = 0;
        while (index == this.currentAdviceIndex && whileCounter++ < 100){
          index = getIndex();
        }

        this.currentAdviceIndex = index
        this.advice = this.gameService.advices[adviceType][index]
      }
      if (this.gameService.gameOn && !this.gameService.gameOver) {
        generateAdvice('gameAdvices');
      } else if (this.gameService.gameOver) {
        this.advice = null
      } else {
        generateAdvice('preGameAdvices');
      }
    // } else {
    //   this.advice = null
    // }
  });

  constructor(
    private gameService: GameService
  ) { }
}
