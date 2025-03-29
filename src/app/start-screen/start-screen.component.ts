import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';
import { Game } from '../../models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { RandomService } from '../services/random.service';

@Component({
  selector: 'app-start-screen',
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})

export class StartScreenComponent {
  constructor(private router: Router, public firebaseService: FirebaseService, public dialog: MatDialog, private random: RandomService) { }

  inject = inject(FirebaseService);

  newGame() {
    this.openDialog();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe(name => {
      if (name && name.length > 0) {
        this.startGame(name);
      }
    });
  }

  startGame(playerName: string) {
    const game = new Game();
    game.players = [playerName];
    game.playerImages = ['avatar_' + this.random.getRandomInt(1, 21) + '.png'];
    this.firebaseService.addNewGameToFirebase(game).then(gameId => {
      this.router.navigate(['/game', gameId]);
    }).catch(error => {
      console.error('Error creating new game:', error);
    });
  }
}