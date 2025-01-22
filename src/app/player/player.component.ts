import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  @Input() name: string = '';

  avatarNumber: number = this.getRandomInt(0, 22);
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
