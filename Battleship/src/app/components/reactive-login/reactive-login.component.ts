import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { GameService } from 'src/app/services/game.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reactive-login',
  templateUrl: './reactive-login.component.html',
  styleUrls: ['./reactive-login.component.scss']
})
export class ReactiveLoginComponent implements OnInit {

  constructor(
    private gameService: GameService,
    private router: Router
  ) { }


  myForm: FormGroup


  ngOnInit() {
    this.myForm = new FormGroup({
      'username': new FormControl(this.gameService.player.username, [
        Validators.required,
        Validators.pattern('[a-zA-Z]+')
      ]),
      'email': new FormControl('', [
        Validators.required,
        Validators.email
        // Validators.pattern('[a-zA-Z_]+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}')
      ]),
      'mode': new FormControl({value: 'computer', disabled: true}, [Validators.required])
    });
  }

  login () {
    if (this.myForm.value.username != this.gameService.player.username) {
      //  <- тут надо будет отсоединиться текущему юзверью
      this.gameService.player.username = this.myForm.value.username
      this.gameService.gameInit();
    }
    // this.router.navigate(['/game']);
    // console.log(this.myForm);
  }

}
