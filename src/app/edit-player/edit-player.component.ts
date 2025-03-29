import { Component } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-edit-player',
  imports: [MaterialModule],
  templateUrl: './edit-player.component.html',
  styleUrl: './edit-player.component.scss'
})
export class EditPlayerComponent {
  constructor(public dialogRef: MatDialogRef<EditPlayerComponent>) { };

  allImages = [
    'avatar_0.png',
    'avatar_1.png',
    'avatar_10.png',
    'avatar_11.png',
    'avatar_12.png',
    'avatar_13.png',
    'avatar_14.png',
    'avatar_15.png',
    'avatar_16.png',
    'avatar_17.png',
    'avatar_18.png',
    'avatar_19.png',
    'avatar_2.png',
    'avatar_20.png',
    'avatar_21.png',
    'avatar_3.png',
    'avatar_4.png',
    'avatar_5.png',
    'avatar_6.png',
    'avatar_7.png',
    'avatar_8.png',
    'avatar_9.png'
  ]
}
