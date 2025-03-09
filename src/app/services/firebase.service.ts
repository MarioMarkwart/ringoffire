import { Injectable, inject, OnDestroy, OnInit } from '@angular/core';
import { Firestore, collection, doc, onSnapshot, addDoc, updateDoc, deleteDoc, query, limit, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService implements OnDestroy {

  firestore: Firestore = inject(Firestore);
  unsubGame!: () => void;
  
  constructor() {
    this.subscribeToGameChanges();
  }


  subscribeToGameChanges(){
    this.unsubGame = onSnapshot(collection(this.firestore, 'games'), (snapshot) => {
      snapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
      });
    })
  }


  ngOnDestroy() { 
    if(this.unsubGame) this.unsubGame();
  }

}
