import { CommonModule } from '@angular/common';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Game } from '../../models/game';
import { PlayerComponent } from "../player/player.component";
import { GameInfoComponent } from '../game-info/game-info.component';
import { MaterialModule } from '../shared/material.module';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { FirebaseService } from '../services/firebase.service';
import { ActivatedRoute, Router } from '@angular/router';
import { deleteDoc, Unsubscribe, updateDoc } from '@angular/fire/firestore';
import { PlayerMobileComponent } from "../player-mobile/player-mobile.component";
import { EditPlayerComponent } from '../edit-player/edit-player.component';
import { RandomService } from '../services/random.service';
import { ClipboardModule } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-game',
  imports: [CommonModule, PlayerComponent, MaterialModule, GameInfoComponent, PlayerMobileComponent, ClipboardModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})

export class GameComponent implements OnInit {
  game: Game;
  gameId: string = '';
  unsubscribeGame: Unsubscribe | undefined;
  gameOver: boolean = false;
  fullUrl: string = '';
  showCopyMessage: boolean = false;
  gameIsDeleted: boolean = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, public firebaseService: FirebaseService, private router: Router, private random: RandomService) {
    this.game = new Game();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.gameId = params['id'];
      if (this.gameId) {
        this.unsubscribeGame = this.firebaseService.subscribeToGame(params['id'], (snapshot) => {
          if (snapshot.exists()) {
            const gameData = snapshot.data();
            if (gameData) {
              this.game.players = gameData['players'];
              this.game.playerImages = gameData['playerImages'];
              this.game.stack = gameData['stack'];
              this.game.playedCards = gameData['playedCards'];
              this.game.currentPlayer = gameData['currentPlayer'];
              this.game.pickCardAnimation = gameData['pickCardAnimation'];
              this.game.currentCard = gameData['currentCard'];
            }
          } else {
            if (!this.gameIsDeleted) window.alert("This Game-Id doesn't exist.")
            this.router.navigate(['/'])
          }
        });
      } else {
        this.newGame();
      }
    });
    this.fullUrl = window.location.href;
  }


  @Output() public cardPicked = new EventEmitter<boolean>();

  newGame() {
    this.game = new Game();
  }

  takeCard() {
    if (this.game.stack.length === 0) {
      this.gameOver = true;
    }
    else if (!this.game.pickCardAnimation) {
      this.game.currentCard = this.game.stack.pop();
      this.game.pickCardAnimation = true;

      setTimeout(() => {
        this.game.currentPlayer = (this.game.currentPlayer + 1) % this.game.players.length;
      }, 500)

      this.saveGame();
      setTimeout(() => {
        if (this.game.currentCard) {
          this.game.playedCards.push(this.game.currentCard);
          setTimeout(() => {
            this.game.pickCardAnimation = false;
            this.saveGame();
          }, 100)
        }
      }, 1000);
    }
  }

  restartGame() {
    this.game.stack = this.game.playedCards;
    this.game.playedCards = [];
    this.game.shuffle(this.game.stack);
    this.gameOver = false;
  }


  editPlayer(playerId: number) {
    const dialogRef = this.dialog.open(EditPlayerComponent);

    dialogRef.afterClosed().subscribe((change: string) => {
      if (change) {
        if (change === 'DELETE') {
          this.game.players.splice(playerId, 1);
          this.game.playerImages.splice(playerId, 1);
        } else {
          this.game.playerImages[playerId] = change;
        }
        this.saveGame();
      }
    });
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent);

    dialogRef.afterClosed().subscribe((name: string) => {
      if (name) {
        this.game.players.push(name);
        this.game.playerImages.push('avatar_' + this.random.getRandomInt(1, 21) + '.png');
        this.saveGame();
      }
    });
  }


  async saveGame() {
    await updateDoc(this.firebaseService.getGameRef(this.gameId), this.firebaseService.getCleanJson(this.game));
  }

  async deleteGame(gameId: string) {
    const confirm = window.confirm('Are you sure you want to delete the game?');
    if (confirm) {
      this.gameIsDeleted = true;
      await deleteDoc(this.firebaseService.getGameRef(gameId));
      this.router.navigate(['/'])
    }
  }

  copyUrl() {
    this.showCopyMessage = true;
    setTimeout(() => {
      this.showCopyMessage = false;
    }, 2000);
  }
}
