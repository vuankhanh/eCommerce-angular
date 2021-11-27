import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
});
=======
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
>>>>>>> eb644a7f4fa094aaf7ca075300a9b1dcac009f60
