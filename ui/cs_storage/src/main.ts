import { platformBrowser } from '@angular/platform-browser';
import { AppModule } from './app/app.module';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

platformBrowser().bootstrapModule(AppModule, {
  ngZoneEventCoalescing: true,
}).catch(err => console.error(err))
