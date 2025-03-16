import { Injectable, inject, OnDestroy, OnInit } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, query, limit, where, Unsubscribe, DocumentSnapshot, DocumentReference } from '@angular/fire/firestore';
import { Game } from '../../models/game';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  firestore: Firestore = inject(Firestore);
  unsubGamesChanges: Unsubscribe | undefined;

  constructor() {
  }

  OnInit() {
    this.unsubGamesChanges = this.subscribeToGameChanges();
  }

  subscribeToGameChanges() {
    return onSnapshot(collection(this.firestore, 'games'), (snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
  }

  // subscribeToGame(gameId: string) {
  //   return onSnapshot(this.getGameRef(gameId), (game) => {
  //     console.log("game: ", game.id, " => ", game.data());
  //   })
  // }

  subscribeToGame(gameId: string, callback: (snapshot: DocumentSnapshot<any>) => void) {
    return onSnapshot(this.getGameRef(gameId), callback);
  }

  getGameRef(gameId: string) {
    return doc(collection(this.firestore, 'games'), gameId);
  }

  async addNewGameToFirebase(newGame: Game): Promise<string> {
    try {
      const docRef: DocumentReference = await addDoc(collection(this.firestore, 'games'), this.getCleanJson(newGame));
      console.log('docRef: ', docRef.id);
      return docRef.id; // Dokument-ID zurückgeben
    } catch (error) {
      console.error("Error adding document: ", error);
      throw error;
    }
  }


  ngOnDestroy() {
    if (this.unsubGamesChanges) this.unsubGamesChanges();
  }

  getCleanJson(game: Game): { players: string[], stack: string[], playedCards: string[], currentPlayer: number, pickCardAnimation: boolean, currentCard: string | undefined } {
    return {
      players: game.players,
      stack: game.stack,
      playedCards: game.playedCards,
      currentPlayer: game.currentPlayer,
      pickCardAnimation: game.pickCardAnimation,
      currentCard: game.currentCard
    }
  }

}
