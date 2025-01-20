import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})

export class GameComponent {
  pickCardAnimation = false;
  game: Game;
  // oder game!: Game; // non-null assertion operator

  constructor() {
    this.game = new Game;
  }

  ngOnInit():void {
    this.newGame();
  }


  @Output() public cardPicked = new EventEmitter<boolean>();

  newGame() {
    this.game = new Game;
    console.log(this.game);

  }
  takeCard() {
    this.pickCardAnimation = true;
  }
}
