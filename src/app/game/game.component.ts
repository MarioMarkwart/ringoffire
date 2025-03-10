import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { GameInfoComponent } from '../game-info/game-info.component';
import { MaterialModule } from '../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, MaterialModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})

export class GameComponent {
  pickCardAnimation: boolean = false;
  currentCard: string | undefined = '';
  game: Game;
  // oder game!: Game; // non-null assertion operator

  constructor(private route: ActivatedRoute,public dialog: MatDialog, public firebaseService: FirebaseService) {
    this.game = new Game();

  }

  ngOnInit(): void {
    this.newGame();
    this.route.params.subscribe(params => {
      this.firebaseService.subscribeToGame(params['id'])
    })
    // this.firebaseService.subscribeToGameChanges();
    // this.firebaseService.addNewGameToFirebase(new Game());
  }

  @Output() public cardPicked = new EventEmitter<boolean>();


  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (!this.pickCardAnimation) {
      this.currentCard = this.game.stack.pop();
      this.pickCardAnimation = true;

      setTimeout(() => {
        this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
      }, 500)

      setTimeout(() => {
        if (this.currentCard) {
          this.game.playedCards.push(this.currentCard);
        }
        this.pickCardAnimation = false;
      }, 1000);
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
      }
    });
  }

}
