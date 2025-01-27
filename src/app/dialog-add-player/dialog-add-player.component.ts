import { Component } from '@angular/core';
import { MaterialModule } from '../shared/material.module';

@Component({
  selector: 'app-dialog-add-player',
  imports: [MaterialModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  constructor() { };

  onNoClick(): void {
    console.log('closed')
  }
  name: string = '';
}
