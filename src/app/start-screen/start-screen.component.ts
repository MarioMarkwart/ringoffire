import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { inject } from '@angular/core';
import { Game } from '../../models/game';

@Component({
  selector: 'app-start-screen',
  imports: [],
  templateUrl: './start-screen.component.html',
  styleUrl: './start-screen.component.scss'
})

export class StartScreenComponent {
  constructor(private router: Router, public firebaseService: FirebaseService) { }

  inject = inject(FirebaseService);

  newGame() {
    this.firebaseService.addNewGameToFirebase(new Game()).then(gameId => {
      this.router.navigate(['/game', gameId]);
    }).catch(error => {
      console.error('Error creating new game:', error);
    });

  }
}
