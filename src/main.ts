import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';  // <-- Add this line
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment'; // Assuming you have an environment file with Firebase config

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(routes),
    provideAuth0({
      domain: 'dev-7yujk5octccad0s1.eu.auth0.com',
      clientId: 'jwjx1mh8mODecUWqJlcRZesgE3Xey5xI',
      authorizationParams: {
        redirect_uri: window.location.origin
      }
    }),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),  // Initialize Firebase with config
    provideFirestore(() => getFirestore()),  // Provide Firestore
  ]
})
  .catch((err) => console.error(err));
