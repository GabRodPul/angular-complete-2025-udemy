import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';

const logIntrcpt = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  // const _req = req.clone({
  //   headers: req.headers.set("X-DEBUG", "TESTING")
  // });
  console.log("OUTGOING REQUEST");
  console.log(req);
  return next(req)
    .pipe(
      tap({
        next: event => {
          if (event.type === HttpEventType.Response) {
            console.log("INCOMING RES");
            console.log(event.status);
            console.log(event.body);
          }
        }
      })
    );
}

bootstrapApplication(AppComponent, {
  providers: [ provideHttpClient(
    withInterceptors([logIntrcpt])
  )]
}).catch((err) => console.error(err));
