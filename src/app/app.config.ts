import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp(
      { projectId: "ringoffire-80778",
        appId: "1:524800996093:web:5cdc489996da7257664494",
        storageBucket: "ringoffire-80778.firebasestorage.app",
        apiKey: "AIzaSyBWBwH7-VCBsxgjQHng1cDtCYZuofSEKUA",
        authDomain: "ringoffire-80778.firebaseapp.com",
        messagingSenderId: "524800996093",
        measurementId: "G-8TG8L85G9T" }
      )),
      provideFirestore(() => getFirestore()), provideFirebaseApp(() => initializeApp({ projectId: "ringoffire-80778", appId: "1:524800996093:web:5cdc489996da7257664494", storageBucket: "ringoffire-80778.firebasestorage.app", apiKey: "AIzaSyBWBwH7-VCBsxgjQHng1cDtCYZuofSEKUA", authDomain: "ringoffire-80778.firebaseapp.com", messagingSenderId: "524800996093", measurementId: "G-8TG8L85G9T" })), provideFirestore(() => getFirestore())]
};
