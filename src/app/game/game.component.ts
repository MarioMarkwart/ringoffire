import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent {

  pickCardAnimation = false;

  @Output() public cardPicked = new EventEmitter<boolean>();

  takeCard() {
    this.pickCardAnimation = true;
  }
}
