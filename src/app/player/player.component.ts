import { Component, OnInit, Input, input } from '@angular/core';

@Component({
  selector: 'app-player',
  imports: [],
  templateUrl: './player.component.html',
  styleUrl: './player.component.scss'
})
export class PlayerComponent {

  @Input() name: string = '';
  @Input() playerActive: boolean = false;
  @Input() image: string = 'avatar_1.png';

}
