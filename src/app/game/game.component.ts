import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { GameInfoComponent } from '../game-info/game-info.component';
import { MaterialModule } from '../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Unsubscribe } from '@angular/fire/firestore';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, MaterialModule, GameInfoComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})

export class GameComponent implements OnInit {
  pickCardAnimation: boolean = false;
  currentCard: string | undefined = '';
  game: Game;
  unsubscribeGame: Unsubscribe | undefined;
  // oder game!: Game; // non-null assertion operator

  constructor(private route: ActivatedRoute, public dialog: MatDialog, public firebaseService: FirebaseService, private router: Router) {
    this.game = new Game();

  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.unsubscribeGame = this.firebaseService.subscribeToGame(params['id'], (snapshot) => {
          if (snapshot.exists()) {
            const gameData = snapshot.data();
            if (gameData) {
              this.game.players = gameData['players'];
              this.game.stack = gameData['stack'];
              this.game.playedCards = gameData['playedCards'];
              this.game.currentPlayer = gameData['currentPlayer'];
            }
          } else {
            console.log('No such document!');
          }
        });
      } else {
        this.newGame(); // neues Game erstellen, wenn keine ID vorhanden ist
      }
    });
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
