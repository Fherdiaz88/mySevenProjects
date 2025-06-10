import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, keyOutline, eyeOutline, eyeOffOutline } from 'ionicons/icons';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
  
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// 🔧 Cambia esta línea:
import { environment } from './environments/environment';

// Firebase
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),

    // 🔧 Usa environment.firebaseConfig
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
  ],
});

addIcons({
  'mail-outline': mailOutline,
  'key-outline': keyOutline,
  'eye-outline': eyeOutline,
  'eye-off-outline': eyeOffOutline,
});

defineCustomElements(window);
