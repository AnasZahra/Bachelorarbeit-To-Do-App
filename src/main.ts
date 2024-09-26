import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAuth0 } from '@auth0/auth0-angular';
import { routes } from './app/app.routes';
import { provideRouter } from '@angular/router';
import { appConfig } from './app/app.config';

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
    ...appConfig.providers // Spread the existing appConfig providers if needed
  ]
})
  .catch((err) => console.error(err));
