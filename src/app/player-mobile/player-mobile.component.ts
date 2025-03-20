import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-player-mobile',
  imports: [],
  templateUrl: './player-mobile.component.html',
  styleUrl: './player-mobile.component.scss'
})
export class PlayerMobileComponent {
  @Input() name: string = '';
  @Input() playerActive: boolean = false;
  avatarNumber: number = this.getRandomInt(0, 21);
  
  getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
