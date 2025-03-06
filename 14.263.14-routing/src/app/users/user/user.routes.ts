import { Routes } from "@angular/router";
import { TasksComponent } from "../../tasks/tasks.component";
import { canLeave, NewTaskComponent } from "../../tasks/new-task/new-task.component";

export const userRoutes: Routes = [
  { 
    path: "", 
    redirectTo: "tasks",
    pathMatch: "prefix"
  },
  { 
    path: "tasks",     
    component: TasksComponent,
    runGuardsAndResolvers: "always"
  },
  { 
    path: "tasks/new", 
    component: NewTaskComponent,
    canDeactivate: [canLeave]
  },
];