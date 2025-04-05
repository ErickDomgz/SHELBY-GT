import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { isDevMode } from '@angular/core';

bootstrapApplication(AppComponent, appConfig)
  .then(() => {
    if ('serviceWorker' in navigator && !isDevMode()) {
      navigator.serviceWorker.register('ngsw-worker.js')
        .then(reg => console.log('Service Worker registrado correctamente:', reg))
        .catch(err => console.error('Error al registrar el Service Worker:', err));
    }
  })
  .catch(err => console.error(err));
