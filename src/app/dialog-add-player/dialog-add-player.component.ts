import { Component } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-player',
  imports: [MaterialModule],
  templateUrl: './dialog-add-player.component.html',
  styleUrl: './dialog-add-player.component.scss'
})
export class DialogAddPlayerComponent {
  constructor(private dialogRef: MatDialogRef<DialogAddPlayerComponent>) { };

  onNoClick(): void {
    this.dialogRef.close();
  }
  name: string = '';
}
