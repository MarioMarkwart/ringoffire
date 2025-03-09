import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { FirebaseComponent } from './firebase/firebase.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Ring Of Fire';
}
