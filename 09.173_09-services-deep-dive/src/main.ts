import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { LoggingService } from './app/logging.service';
import { InjectionToken } from '@angular/core';
import { TasksService } from './app/tasks/tasks.service';

export const TaskToken = new InjectionToken<TasksService>("tasks-service-token");

bootstrapApplication(AppComponent
  ,{ providers: [ { provide: TaskToken, useClass: TasksService } ] }
).catch((err) => console.error(err));

// bootstrapApplication(AppComponent).catch((err) => console.error(err));
